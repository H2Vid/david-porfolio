"use client"

export default function Home() {
  return (
    <div
      onAnimationStart={(e) => {
        console.log(e)
      }}
    >
      Hello
    </div>
  )
}
