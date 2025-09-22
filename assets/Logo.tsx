const Logo = ({ className = 'h-8 w-8' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {/* Building structure */}
      <rect
        x='8'
        y='16'
        width='8'
        height='20'
        fill='currentColor'
        className='text-blue-600'
      />
      <rect
        x='16'
        y='12'
        width='8'
        height='24'
        fill='currentColor'
        className='text-blue-700'
      />
      <rect
        x='24'
        y='8'
        width='8'
        height='28'
        fill='currentColor'
        className='text-blue-800'
      />

      {/* Windows */}
      <rect x='10' y='18' width='1.5' height='1.5' fill='white' />
      <rect x='12.5' y='18' width='1.5' height='1.5' fill='white' />
      <rect x='10' y='21' width='1.5' height='1.5' fill='white' />
      <rect x='12.5' y='21' width='1.5' height='1.5' fill='white' />
      <rect x='10' y='24' width='1.5' height='1.5' fill='white' />
      <rect x='12.5' y='24' width='1.5' height='1.5' fill='white' />

      <rect x='18' y='14' width='1.5' height='1.5' fill='white' />
      <rect x='20.5' y='14' width='1.5' height='1.5' fill='white' />
      <rect x='18' y='17' width='1.5' height='1.5' fill='white' />
      <rect x='20.5' y='17' width='1.5' height='1.5' fill='white' />
      <rect x='18' y='20' width='1.5' height='1.5' fill='white' />
      <rect x='20.5' y='20' width='1.5' height='1.5' fill='white' />
      <rect x='18' y='23' width='1.5' height='1.5' fill='white' />
      <rect x='20.5' y='23' width='1.5' height='1.5' fill='white' />

      <rect x='26' y='10' width='1.5' height='1.5' fill='white' />
      <rect x='28.5' y='10' width='1.5' height='1.5' fill='white' />
      <rect x='26' y='13' width='1.5' height='1.5' fill='white' />
      <rect x='28.5' y='13' width='1.5' height='1.5' fill='white' />
      <rect x='26' y='16' width='1.5' height='1.5' fill='white' />
      <rect x='28.5' y='16' width='1.5' height='1.5' fill='white' />
      <rect x='26' y='19' width='1.5' height='1.5' fill='white' />
      <rect x='28.5' y='19' width='1.5' height='1.5' fill='white' />
      <rect x='26' y='22' width='1.5' height='1.5' fill='white' />
      <rect x='28.5' y='22' width='1.5' height='1.5' fill='white' />

      {/* Checkmark overlay for "True" */}
      <circle
        cx='6'
        cy='6'
        r='5'
        fill='currentColor'
        className='text-green-500'
      />
      <path
        d='M3.5 6L5.5 8L8.5 4'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Logo;
