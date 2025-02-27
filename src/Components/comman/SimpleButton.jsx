import { Link } from "react-router-dom"
import { Button } from "@/Components/ui/button.jsx"

export  default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/">Login</Link>
    </Button>
  )
}
