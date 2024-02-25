export default function Home() {
  return (
    <div id="wrapper">
      <main id="main">
        <div className="inner">
          {/* container full page */}
          <div id="container" className="style5 container default">
            <div className="wrapper">
              <div className="inner">
                <h1 id="text01" className="style3">
                  DIGIBASE
                </h1>
                <p
                  id="text02"
                  className="style2 text-strong"
                  style={{ opacity: 1, transform: "none" }}
                >
                  Digibase symbolize freedom and a rebellious spirit. <br />
                  Our goal is to build a resilient community that is immune to market cycles, serving as a refuge that can withstand any setback.
                  <br />
                  With 3,333 Digibase are unique living dog in Base Chain eternally. <br />
                </p>
                <ul id="buttons02" className="style1 buttons">
                  <li style={{ opacity: 1, transform: "none" }}>
                    <a href="/apply" className="button n01">
                      <span className="label">Get Early Access Now</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* container image1  */}
          <div
            id="image01"
            data-position="center"
            className="style1 image full screen"
          >
            <span className="frame">
              <img src="../image01.png" alt="DIGIBASE"></img>
            </span>
          </div>
          {/* container text02 */}
          <div id="container03" className="style1 container default">
            <div className="wrapper">
              <div className="inner" data-position="center">
                <h2 id="text01" className="style3">
                  The Dawn
                </h2>
                <p id="text02" className="style2">
                  "In the depths of the night, a faithful dog named Digibase emerges, transforming darkness into dawn with the inherent strength of BASE. With unwavering courage, he forges ahead, carrying the torch of his valiant heart. Digibase remains a perpetual presence by your side, eternally."

                </p>
              </div>
            </div>
          </div>
          {/* container image2 */}
          <div
            id="image01"
            data-position="center"
            className="style1 image full screen"
          >
            <span className="frame">
              <img src="../image02.png" alt="DIGIBASE"></img>
            </span>
          </div>
          {/* container FAQ MINT */}
          <div className="wrapper">
            <div className="inner" data-position="center">
              <h3 id="text03" className="style3 w3">
                F A Q
              </h3>
              <p id="text02" className="style2">
                FAQ & Mint info can be found here in
                <a href="
                https://mirror.xyz/0xfe306FF1cdBb101f44d3825772610D1dE222FDdd/Xd98VoZGoDp1PpZRM2ulOfXA0C0jWDYxW9TfT4QgiUY
                "> Digibase Mint 101</a>
              </p>
              {/* <p id="text02" className="style2">List of allow list in<a href="https://mirror.xyz/0xfe306FF1cdBb101f44d3825772610D1dE222FDdd/Q6UKR6mXUWVfzI5QzpmvjRQnaNkz0xg9WsIQg7Ocx5k
              "> here</a></p> */}
            </div>
          </div>
          {/* container footer */}
          <br />
          <br />
          <div className="wrapper">
            <div className="inner" data-position="center">
              <ul id="buttons02" className="style1 buttons">
                <li style={{ opacity: 1, transform: "none" }}>
                  <a href="/apply" className="button n01">
                    <span className="label">Get Early Access Now</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="wrapper">
              <div className="inner" data-position="center">
                <ul id="icon02" className="style1 icons">
                  <li>
                    <a className="n01" target="_blank" href="https://twitter.com/Digibaseart/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      <span className="label">Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* Foot Tag */}

              <p id="text13" className="style9 py-7">
                Powered by
                <a href="https://base.org"> Base</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}