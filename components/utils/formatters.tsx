/* utils/formatters.tsx */

/* shared wrapper – full width, centre‑everything */
const rowWrap = "w-full flex justify-center items-center gap-2";

export const formatOne = (w: string) => (
  <div className={rowWrap + "  whitespace-nowrap text-sm md:text-base"}>
    {w}
  </div>
);

export const formatPair = (pair: string) => {
  const [w1, w2] = pair.split(" → ");
  return (
    <div className="w-full max-w-[300px] md:max-w-[400px] flex justify-center items-center gap-2 text-sm md:text-base font-semibold leading-tight">
      <span className="flex-1 text-right break-words">
        {w1.slice(0, -1)}
        <span className="text-[#67FF56]">{w1.slice(-1)}</span>
      </span>
      <span className="w-6 text-center">⟶</span>
      <span className="flex-1 text-left break-words">
        <span className="text-[#67FF56]">{w2[0]}</span>
        {w2.slice(1)}
      </span>
    </div>
  );
};

export const formatTriple = (triplet: string) => {
  const [w1, w2, w3] = triplet.split(" → ");
  return (
    <div className="w-full max-w-[260px] md:max-w-[360px] flex justify-center items-center gap-2 text-sm md:text-base font-semibold leading-tight">
      <span className="flex-1 text-right whitespace-nowrap break-words">
        {w1.slice(0, -1)}
        <span className="text-[#67FF56]">{w1.slice(-1)}</span>
      </span>
      <span className="w-6 text-center">⟶</span>
      <span className="flex-1 text-center whitespace-nowrap break-words">
        <span className="text-[#67FF56]">{w2[0]}</span>
        {w2.slice(1, -1)}
        <span className="text-[#67FF56]">{w2.slice(-1)}</span>
      </span>
      <span className="w-6 text-center">⟶</span>
      <span className="flex-1 text-left whitespace-nowrap break-words">
        <span className="text-[#67FF56]">{w3[0]}</span>
        {w3.slice(1)}
      </span>
    </div>
  );
};