"use server"

export async function createTask(fd: FormData) {
  const text = fd.get("text") as string
  if (!text) {
    return { error: "Missing text" }
  }

  
}