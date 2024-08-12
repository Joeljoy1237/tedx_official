import React from "react";
import Content from "./components/Content";
import HeaderView from "@widgets/Header";
import Footer from "./components/Footer";

export default function GetTickets() {
  return (
    <main>
      <HeaderView />
      <div className="pt-[100px]">
        <Content />
      </div>
      <Footer/>
    </main>
  );
}
