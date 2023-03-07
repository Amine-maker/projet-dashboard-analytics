import React from "react";
import { useAuth } from "../../hooks/AuthHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco, nightOwl, obsidian, tomorrowNight, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CODE_EXEMPLE } from "../../core/utils/constante";
import { atomDark, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import github from "react-syntax-highlighter/dist/cjs/styles/hljs/github";

export const ProfilePage = (): JSX.Element => {
  const { user } = useAuth();
  const codeString = CODE_EXEMPLE;

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
                    <button className="border border-opacity-50 border-gray-200 p-1 rounded-xl">
                      <span className="text-xs">copier</span>
                    </button>
                  </div>
                </div>
              </div>

              <hr className="my-10" />

              <div className="grid grid-cols-2 gap-x-20">
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Script</h2>
                  </div>

                  <div className="bg-slate-100 h-96 rounded-xl">
                    <SyntaxHighlighter showLineNumbers lineNumberStyle={{ color: "#7e7e7e" }} customStyle={{ borderRadius: "13px", width: "100%", height: "100%" }} language="javascript" style={nightOwl}>
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Sites</h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Site ID : 65868f68</div>
                        <button className="text-gray-400 text-xs">
                          <ContentCopyIcon fontSize="small" />
                        </button>
                      </div>
                      <a href="" className="font-bold hover:text-indigo-900 hover:underline">
                        Blog and social application
                      </a>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Site ID : 6588df9f68</div>
                        <button className="text-gray-400 text-xs">
                          <ContentCopyIcon fontSize="small" />
                        </button>
                      </div>
                      <a href="" className="font-bold hover:text-indigo-900 hover:underline">
                        Mon site 2
                      </a>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Site ID : 6586fg8f68</div>
                        <button className="text-gray-400 text-xs">
                          <ContentCopyIcon fontSize="small" />
                        </button>
                      </div>
                      <a href="" className="font-bold hover:text-indigo-900 hover:underline">
                        Cross-platform application site
                      </a>
                    </div>
                    <div className="p-4 bg-gray-900 text-gray-300 rounded-xl space-y-2">
                      <div className="flex justify-between">
                        {" "}
                        <button className="font-bold hover:text-indigo-100 ">Ajouter un site</button>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
