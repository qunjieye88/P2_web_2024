/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import FormFetch from "@/app/_component/general/FormFetch"


export default function pageRegister() {


  return (
    <div className="pageLoginh">
      <FormFetch
        path={"https://bildy-rpmaya.koyeb.app/api/user/validation"}
        method={"PUT"}
        keys={["code"]}
        functions={() => { }}
        message={"CODE VERIFICATION"}>
        <button>ENVIAR</button>
      </FormFetch>
    </div>
  );
}