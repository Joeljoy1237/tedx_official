import React from "react";
export default function Flicker() {
  return (
    <div className="px-[5vw] py-[10vh] w-full items-center justify-center flex gap-5">
      <h2>
        <span className="text-5xl font-semibold ">
          <span className="w flicker-text reflect">W</span>
          <span className="e flicker-text reflect">E</span>
          <span className="l flicker-text reflect">L</span>
          <span className="c flicker-text reflect">C</span>
          <span className="o flicker-text reflect">O</span>
          <span className="m flicker-text reflect">M</span>
          <span className="e flicker-text reflect">E</span>
        </span>
        <span className="text-primary-700 redText font-black">
          <span className="t flicker-text redText reflect">T</span>
          <span className="e flicker-text redText reflect">E</span>
          <span className="d flicker-text redText reflect">D</span>
          <span className="x flicker-text redText reflect">x</span>
        </span>{" "}
        <span className="font-bold">
          <span className="font-bold ccet1 flicker-text reflect">C</span>
          <span className="font-bold ccet2 flicker-text reflect">C</span>
          <span className="font-bold ccet3 flicker-text reflect">E</span>
          <span className="font-bold ccet4 flicker-text reflect">T</span>
        </span>{" "}
        <span className="">
          <span className="font-sans flicker-text reflect 2">2</span>
          <span className="font-sans flicker-text reflect 0">0</span>
          <span className="font-sans flicker-text reflect 2">2</span>
          <span className="font-sans flicker-text reflect 4">4</span>
        </span>
      </h2>
    </div>
  );
}
