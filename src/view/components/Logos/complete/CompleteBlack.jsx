export default function CompleteBlack (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={800}
      height={800}
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='#000'
        fillRule='evenodd'
        d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-.232-5.36 5-6-1.536-1.28-4.3 5.159-2.225-2.226-1.414 1.414 3 3 .774.774.701-.84Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
