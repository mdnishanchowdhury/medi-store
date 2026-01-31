"use client";
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export default function page() {
  const {data}=authClient.useSession();
  console.log(data)
  return (
    <div>
      <h1>Medi Store</h1>
      <Button>Click me</Button>
    </div>
  )
}
