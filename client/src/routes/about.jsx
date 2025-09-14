import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='background-blue-200 m-2 p-2'>
    <h1 className='font-bold text-2xl text-center'>Hello "about"!</h1>
    <h2 className='font-bold text-xl text-center text-blue-500'>hi</h2>
  </div>
}
