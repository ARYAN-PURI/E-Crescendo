import Image from "next/image";
export default function Footer(){
    return(
        <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex space-x-8 justify-center items-center">
              <Image src="/logo.png" alt="Sponsor 1" width={75} height={75} className="transform rounded-lg hover:scale-110" />
              <Image src="/ecell.png" alt="Sponsor 2" width={130} height={130} className="transform rounded-lg hover:scale-110" />
            </div>
            <div className="text-center text-gray-300">
              <p>Powered By Team E-Cell NITH &copy; 2024</p>
              <p>Creating Future Innovators</p>
            </div>
            <div className="flex space-x-6 justify-center">
              <a href="https://www.facebook.com/eclubnith/" target="_blank" className="rounded-3xl hover:scale-110">
                <Image
                  src="/facebook.png"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="https://x.com/ecellnith?lang=en&mx=2" target="_blank" className="rounded-3xl hover:scale-110">
                <Image
                  src="/twitter.svg"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="https://www.instagram.com/ecell_nith/?hl=en" target="_blank" className="rounded-3xl hover:scale-110">
                <Image
                  src="/insta.svg"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="https://www.linkedin.com/company/entrepreneurshipcellnith/?originalSubdomain=in" target="_blank" className="rounded-3xl hover:scale-110">
                <Image
                  src="/linkdin.webp"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="mailto:entrepreneurshipcellnith@gmail.com" target="_blank" className="rounded-3xl hover:scale-110">
                <Image
                  src="/gmail.svg"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
}