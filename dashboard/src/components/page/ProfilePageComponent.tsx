import React, { useCallback, useState } from "react";
import { useAuth } from "../../hooks/AuthHook";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { SiteComponent } from "../item/SiteComponent";
import { copyToClipboard } from "../../core/utils/utils";

export const ProfilePage = (): JSX.Element => {
  const { user } = useAuth();

  const [selectedSite, setSelectedSite] = useState<string>(user?.sites != null && user.sites.length > 0 ? user.sites[0].id : "Pas encore de site");

  useCallback(() => {
    setSelectedSite(selectedSite);
  }, [selectedSite]);

  const codeString = `
  <main class="app" id="dadasha"
    data-site-id="${selectedSite}"
    data-client-id="${user?.id as string}">
    <section>
      mon app
    </section>
  </main>
  `;

  const htmlIntegrationCode = `
    <script type="module" src="/chemin/vers/script.js"></script>
  `;

  const funcIntegrationCode = `
  import InitDadasha from "/chemin/vers/script.js";

  const option = {
     siteId: '${selectedSite}',
     clientId: '${user?.id as string}' }
   
   InitDadasha(option);
  
  `;

  return (
    <section className="relative bg-gray-50 max-h-screen">
      <main className="ml-60 pt-16 max-h-screen overflow-auto h-screen">
        <div className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-gray-300 rounded-3xl p-8 mb-5">
              <h1 className="text-3xl font-bold mb-10">Gérer mes parametres</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-stretch">
                  <div className="flex flex-nowrap space-x-3">
                    <span className="border border-gray-300 rounded-md px-2 py-1">{user?.username}</span>
                    <div className="h-100 border-l mx-4"></div>
                    <span className="border border-gray-300 rounded-md px-2 py-1">{user?.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-x-2">
                  <div className="inline-flex items-center justify-center h-9 pl-5 pr-1 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition gap-4">
                    <span>UserId : {user?.id}</span>
                    <button
                      onClick={() => {
                        void (async () => {
                          await copyToClipboard(user?.id as string);
                        })();
                      }}
                      className="border border-opacity-50 border-gray-200 p-1 rounded-xl"
                    >
                      <span className="text-xs">copier</span>
                    </button>
                  </div>
                </div>
              </div>

              <hr className="my-10" />

              <div className="grid grid-cols-2 gap-x-20">
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Intégration</h2>
                  </div>

                  <div className="bg-slate-100 rounded-xl">
                    <SyntaxHighlighter showLineNumbers lineNumberStyle={{ color: "#7e7e7e" }} customStyle={{ borderRadius: "13px", width: "100%", height: "100%" }} language="html" style={nightOwl}>
                      {htmlIntegrationCode}
                    </SyntaxHighlighter>
                    <br />
                    <p className="p-3 font-bold info-script">
                      Vous pouvez passez dans le html via les attributs <br /> <span className="text-sm variable">data-site-id</span> & <span className="variable text-sm">data-client-id</span>. L&apos;identifiant dans la balise est important.
                    </p>
                    <SyntaxHighlighter showLineNumbers lineNumberStyle={{ color: "#7e7e7e" }} customStyle={{ borderRadius: "13px", width: "100%", height: "100%" }} language="html" style={nightOwl}>
                      {codeString}
                    </SyntaxHighlighter>
                    <br />
                    <p className="p-3 font-bold info-script">Ou alors via un script qui récupère la fonction d&apos;initialisation </p>
                    <SyntaxHighlighter showLineNumbers lineNumberStyle={{ color: "#7e7e7e" }} customStyle={{ borderRadius: "13px", width: "100%", height: "100%" }} language="javascript" style={nightOwl}>
                      {funcIntegrationCode}
                    </SyntaxHighlighter>

                    <br />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Sites</h2>
                  <SiteComponent onSiteChange={setSelectedSite} selectedSite={selectedSite}></SiteComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
