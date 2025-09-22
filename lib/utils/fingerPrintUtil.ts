// utils/fingerprint-hardware-only.ts
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Type definitions for better TypeScript support
declare global {
  interface Navigator {
    userAgentData?: {
      mobile: boolean;
      brands: Array<{ brand: string; version: string }>;
      getHighEntropyValues(hints: string[]): Promise<any>;
    };
    hardwareConcurrency?: number;
    deviceMemory?: number;
  }
}

/** ---------- Helpers ---------- **/
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function canonicalize(value: any): any {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(canonicalize);
  const out: Record<string, any> = {};
  for (const key of Object.keys(value).sort()) out[key] = canonicalize(value[key]);
  return out;
}

const safe = async <T>(fn: () => Promise<T>, fallback: any = 'unsupported'): Promise<T | any> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};


// 1) Core system information (identical between modes)
async function collectCoreSystem() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages || [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    cpuCores: navigator.hardwareConcurrency || 'unknown',
    deviceMemory: navigator.deviceMemory || 'unknown',
    maxTouchPoints: navigator.maxTouchPoints || 0,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || 'unknown',
  };
}

// 2) Display hardware specs (identical between modes)
async function collectDisplayHardware() {
  return {
    screen: {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
    },
    // Don't include window dimensions as they can vary
  };
}


// 4) Core font availability (hardware/OS level)
async function collectCoreFonts() {
  try {
    // Only check for core system fonts that are hardware/OS dependent
    const systemFonts = [
      'Arial',
      'Times New Roman',
      'Courier New',
      'Helvetica',
      'Georgia',
      // Don't check too many fonts as availability can differ between modes
    ];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'unsupported';

    const testText = 'mmmmmmmmlli';
    ctx.textBaseline = 'top';
    ctx.font = '72px monospace';
    
    const baseWidth = ctx.measureText(testText).width;
    const available: string[] = [];

    for (const font of systemFonts) {
      ctx.font = `72px '${font}', monospace`;
      const width = ctx.measureText(testText).width;
      if (Math.abs(width - baseWidth) > 2) { // Larger tolerance
        available.push(font);
      }
    }

    // Return sorted list for consistency
    return available.sort();
  } catch {
    return 'unsupported';
  }
}

// 5) Audio hardware capabilities (not rendered audio, just specs)
async function collectAudioHardware() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return 'unsupported';

    const ctx = new AudioContext();
    
    // Only collect hardware audio specs, not rendered content
    const specs = {
      sampleRate: ctx.sampleRate,
      maxChannelCount: ctx.destination.maxChannelCount,
      numberOfInputs: ctx.destination.numberOfInputs,
      numberOfOutputs: ctx.destination.numberOfOutputs,
    };

    ctx.close();
    return specs;
  } catch {
    return 'unsupported';
  }
}


// 8) Browser installation fingerprint (stable across modes, unique per installation)
async function collectBrowserInstallation() {
  try {
    const features = {
      // Browser-specific API availability (varies by installation/extensions)
      apis: {
        webgl2: !!(document.createElement('canvas').getContext('webgl2')),
        webgpu: !!(navigator as any).gpu,
        bluetooth: !!(navigator as any).bluetooth,
        usb: !!(navigator as any).usb,
        serial: !!(navigator as any).serial,
        hid: !!(navigator as any).hid,
        mediaDevices: !!navigator.mediaDevices,
        serviceWorker: !!navigator.serviceWorker,
        pushManager: !!(window as any).PushManager,
        notifications: !!(window as any).Notification,
        geolocation: !!navigator.geolocation,
        vibrate: !!navigator.vibrate,
        battery: !!(navigator as any).getBattery,
        gamepad: !!navigator.getGamepads,
        vr: !!(navigator as any).getVRDisplays,
        xr: !!(navigator as any).xr,
      },
      
      // Browser feature support variations
      features: {
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack || null,
        onLine: navigator.onLine,
        javaEnabled: (navigator as any).javaEnabled?.() || false,
        pdfViewerEnabled: (navigator as any).pdfViewerEnabled || false,
        appCodeName: navigator.appCodeName,
        appName: navigator.appName,
        product: navigator.product,
        productSub: navigator.productSub,
        vendor: navigator.vendor,
        vendorSub: navigator.vendorSub,
      },
      
      // Plugin count (varies by installation but stable across modes)
      pluginCount: navigator.plugins.length,
      mimeTypeCount: navigator.mimeTypes.length,
    };
    
    return features;
  } catch {
    return 'unsupported';
  }
}

// 9) Enhanced WebGL fingerprint (more detailed but stable)
async function collectEnhancedWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null ||
               canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    
    if (!gl || !('getParameter' in gl)) return 'unsupported';

    const extensions = gl.getSupportedExtensions() || [];
    
    // Collect more detailed WebGL parameters that are stable across modes
    const params = {
      // Basic info
      version: gl.getParameter(gl.VERSION),
      shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      
      // Hardware limits (stable)
      maxTexSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxCubeMapSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
      maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
      maxVertexTextureImageUnits: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      maxCombinedTextureImageUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      
      // Precision formats (GPU-specific)
      vertexShaderPrecision: {
        highFloat: gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT),
        mediumFloat: gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT),
        lowFloat: gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT),
      },
      
      fragmentShaderPrecision: {
        highFloat: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT),
        mediumFloat: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT),
        lowFloat: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT),
      },
      
      // Extensions (sorted for consistency)
      extensions: extensions.sort(),
      extensionCount: extensions.length,
      
      // WebGL2 support
      webgl2Support: !!(document.createElement('canvas').getContext('webgl2')),
    };
    
    return params;
  } catch {
    return 'unsupported';
  }
}

// 10) Performance characteristics (hardware-dependent but stable)
async function collectPerformanceCharacteristics() {
  try {
    const start = performance.now();
    
    // Simple computational benchmark (results vary by hardware)
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    
    const computeTime = Math.round((performance.now() - start) * 100) / 100;
    
    return {
      computeTime: computeTime > 100 ? '100+' : Math.floor(computeTime).toString(), // Bucket to reduce noise
      performanceTiming: {
        navigationStart: performance.timeOrigin ? Math.floor(performance.timeOrigin / 1000000) : 'unknown',
      },
      memory: (performance as any).memory ? {
        // Round to reduce precision and increase stability
        jsHeapSizeLimit: Math.floor(((performance as any).memory.jsHeapSizeLimit || 0) / 1048576), // MB
      } : 'unsupported',
    };
  } catch {
    return 'unsupported';
  }
}


// Enhanced version with more uniqueness while maintaining stability
export async function getFingerprint(): Promise<string> {
  try {

    const agent = await FingerprintJS.load();
    const fp = await agent.get();
    const [
      coreSystem,
      displayHardware,
      enhancedWebGL,
      browserInstallation,
      performanceChars,
      audioHardware,
      coreFonts,
    ] = await Promise.all([
      safe(collectCoreSystem),
      safe(collectDisplayHardware), 
      safe(collectEnhancedWebGL),
      safe(collectBrowserInstallation),
      safe(collectPerformanceCharacteristics),
      safe(collectAudioHardware),
      safe(collectCoreFonts),
    ]);

    const enhancedData = {

      fingerPrint: fp.visitorId,
      // Core stable data
      userAgent: coreSystem.userAgent,
      platform: coreSystem.platform,
      language: coreSystem.language,
      timezone: coreSystem.timezone,
      cpuCores: coreSystem.cpuCores,
      deviceMemory: coreSystem.deviceMemory,
      
      // Display specs
      colorDepth: displayHardware.screen.colorDepth,
      pixelRatio: displayHardware.screen.pixelRatio,
      
      // WebGL detailed fingerprint (more unique)
      webglExtensions: enhancedWebGL.extensions,
      webglLimits: {
        maxTexSize: enhancedWebGL.maxTexSize,
      },
      webglPrecision: enhancedWebGL.vertexShaderPrecision,
      
      // Browser installation characteristics
      apiSupport: browserInstallation.apis,
      pluginCount: browserInstallation.pluginCount,
      
      // // Performance characteristics (hardware-dependent)
      memoryLimit: performanceChars.memory,
      ...audioHardware,
      ...coreFonts
    };
    
    return await sha256(JSON.stringify(canonicalize(enhancedData)));
  } catch (e) {
    console.error('Enhanced fingerprint failed:', e);
    const agent = await FingerprintJS.load();
    const fp = await agent.get();
    return fp.visitorId || 'unknown';
   
  }
}
