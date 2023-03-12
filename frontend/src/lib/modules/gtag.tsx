import Script from 'next/script'

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const GAHtml = `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());

           gtag('config', '${GA_ID}');
           `

export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_ID, {
      page_path: url
    })
  }
}

export const GtagScript = () => {
  if (!GA_ID) return <></>
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: GAHtml
        }}
      />
    </>
  )
}
