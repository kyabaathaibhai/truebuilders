interface VisitTrackingPayload {
  session_id: string;
  event: string;
  page: string;
  entryTime: string;
  exitTime: string;
  duration_seconds: number;
  device_type: string;
  browser: string;
  os: string;
  client_id: number;
  microsite_slug: string;
  location_approx: string;
  ip_address: string;
  js_fingerprint: string;
  visit_log_token: string;
  useBeacon?: boolean;
}

interface VisitTrackingInputPayload {
  session_id: string;
  event: string;
  page: string;
  entryTime: string;
  exitTime: string;
  duration_seconds: number;
  device_type: string;
  browser: string;
  os: string;
  client_id: number;
  microsite_slug: string;
  location_approx: string;
  ip_address: string;
  js_fingerprint: string;
  useBeacon?: boolean;
}

class VisitTrackingService {
  private visitLogToken: string;
  private tokenExpiry: number | null = null;
  private isEmployeeVisit: boolean = false;

  /**
   * Get visit log token from the API
   */
  async getVisitLogToken(): Promise<string> {

    // Check if we have a valid token
    if (this.visitLogToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      console.log('Using cached visit log token');
      return this.visitLogToken;
    }

    try {
      const response = await fetch('/api/visit-token')
      console.log('API response status:', response);
      const data = await response.json();

      this.visitLogToken = data.token;
      // Set token expiry (JWT tokens expire in 10 minutes)
      // We'll refresh 1 minute before expiry
      this.tokenExpiry = Date.now() + (9 * 60 * 1000); // 9 minutes

      return this.visitLogToken;
    } catch (error) {
      console.error('Failed to get visit log token:', error);
      throw error;
    }
  }

  /**
   * Track a page visit with the visit log token
   */
  async trackVisit(payload: VisitTrackingInputPayload): Promise<void> {
    try {
      console.log('Tracking visit for page:', payload.page);
      const token = await this.getVisitLogToken();
      
      const payloadWithToken: VisitTrackingPayload = {
        ...payload,
        visit_log_token: token
      };

      const blob = new Blob([JSON.stringify(payloadWithToken)], {
        type: 'text/plain',
      });

      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/track/visit`;

      // Use sendBeacon if useBeacon is true and available
      if (payload.useBeacon && navigator.sendBeacon) {
        const success = navigator.sendBeacon(endpoint, blob);
        if (success) {
          console.log('Visit tracked successfully using sendBeacon for page:', payload.page);
          // Fire ProjectView events after successful sendBeacon call
          this.fireProjectViewEventsAfterVisit(payload);
          return;
        } else {
          console.log('sendBeacon failed, falling back to fetch for page:', payload.page);
        }
      }

      // Use fetch (either because useBeacon is false or sendBeacon failed)
      const resp = await fetch(endpoint, {
        method: 'POST',
        body: blob,
        headers: {
          'Content-Type': 'application/json',
        },
        keepalive: true,
      });

      // Read response to capture is_employee_visit flag
      try {
        const respData = await resp.json();
        if (typeof respData?.is_employee_visit === 'boolean') {
          this.isEmployeeVisit = respData.is_employee_visit;
          console.log('Employee visit flag updated from /api/track/visit response:', this.isEmployeeVisit);
        }
      } catch (_e) {
        // ignore JSON parse issues; continue
      }

      console.log('Visit tracked successfully using fetch for page:', payload.page);
      
      // Fire ProjectView events after successful visit tracking API call
      this.fireProjectViewEventsAfterVisit(payload);
    } catch (error) {
      console.error('Failed to track visit for page:', payload.page, error);
      throw error;
    }
  }

  /**
   * Fire ProjectView events after visit tracking API call
   */
  private fireProjectViewEventsAfterVisit(payload: VisitTrackingInputPayload): void {
    if (typeof window === 'undefined' || !window.fbq) return;

    // Only fire if it's not an employee visit
    if (this.isEmployeeVisit) {
      console.log('Skipping ProjectView events - employee visit detected');
      return;
    }


    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('visitTrackingComplete', {
        detail: { pageType: 'client', micrositeSlug: payload.microsite_slug }
      }));
      console.log('Client page visit tracked - dispatching visitTrackingComplete event');
    }
  }

  /**
   * Get the employee visit flag
   */
  getIsEmployeeVisit(): boolean {
    return this.isEmployeeVisit;
  }


  /**
   * Clear stored token (useful for testing or logout scenarios)
   */
  clearToken(): void {
    this.visitLogToken = "";
    this.tokenExpiry = null;
    this.isEmployeeVisit = false;
  }
}

// Export singleton instance
export const visitTrackingService = new VisitTrackingService();
export default visitTrackingService;
