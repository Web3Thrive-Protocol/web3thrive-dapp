import Link from "next/link";

const Footer = () => {

  const community = [
    {
      title : "Community",
      Links : [
        {
          path: "/discord",
          name: "Discord"
        }, 
        {
          path: "/twitter",
          name: "Twitter"
        }, 
        {
          path: "/path",
          name:"Telegram"
        }, 
        {
          path: "/github",
          name:"Github"
        }
      ]
    },
  ];

  const resources = [
    {
      title: "Resources",
      Links : [
        {path:"/whitepaper", name:"Whitepaper"}, 
        {path:"/docs", name: "Documentation"}, 
        {path:"/blog", names:"Blog"}
      ] 
    }
  ];

  const ecosystem = [
    {
      title: "Ecosystem",
      Links: [
        {path:"/path", name:"Careers"}, 
        {path:"/terms",name:"Terms of Service"}, 
        {path:"/policy", name: "Privacy Policy"}
      ],
    }
  ]
  return (
    <>
        <footer className="grid px-4 py-12 sm:py-12 md:py-24 lg:grid-cols-2 lg:py-32 gap-12">
            <div className="flex flex-col gap-5">
              <Link href="/" className="mb-1 text-2xl">
                web3thrive
              </Link>
              <p className="text-sm max-w-4xl">
              Web3Thrive courses help you build real-world skills and earn NFTs that
              validate your growth and enhance your reputation as a Web3 freelancer.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
              {community.map((el,index) => (
                <div key={index} className="flex flex-col gap-0.5">
                  <p className="font-semibold">{el.title}</p>
                  {el.Links.map((link,index) => (
                    <Link key={index} href={link.path} className="text-sm text-black/50 hover:text-black transition-colors">
                        {link.name}
                    </Link>
                  ))}
                </div>
              ))}

            {resources.map((el,index) => (
                <div key={index} className="flex flex-col gap-0.5">
                  <p className="font-semibold">{el.title}</p>
                  {el.Links.map((link,index) => (
                    <Link key={index} href={link.path} className="text-sm text-black/50 hover:text-black transition-colors">
                        {link.name}
                    </Link>
                  ))}
                </div>
              ))}

          {ecosystem.map((el,index) => (
                <div key={index} className="flex flex-col gap-0.5">
                  <p className="font-semibold">{el.title}</p>
                  {el.Links.map((link,index) => (
                    <Link key={index} href={link.path} className="text-sm text-black/50 hover:text-black transition-colors">
                        {link.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

        </footer>
    </>
  )
}

export default Footer