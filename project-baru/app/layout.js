export const metadata = {
  title: 'My Microservices Web',
  description: 'Dibuat dengan Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}