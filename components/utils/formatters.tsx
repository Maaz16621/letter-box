/* utils/formatters.tsx */

/* shared wrapper – full width, centre‑everything */
const rowWrap = "w-full flex justify-center items-center gap-2";

export const formatOne = (w: string) => (
  <div className={rowWrap + " text-base sm:text-lg whitespace-nowrap"}>
    {w}
  </div>
);

export const formatPair = (pair: string) => {
  const [w1, w2] = pair.split(" → ");
  return (
    <div className={rowWrap + " text-lg sm:text-xl font-semibold leading-tight"}>
      {/* word 1 */}
      <span className="text-right">
        {w1.slice(0, -1)}
        <span className="text-[#67FF56]">{w1.slice(-1)}</span>
      </span>

      {/* arrow */}
      <span className="min-w-[1.5rem] text-center">⟶</span>

      {/* word 2 */}
      <span className="text-left">
        <span className="text-[#67FF56]">{w2[0]}</span>
        {w2.slice(1)}
      </span>
    </div>
  );
};

export const formatTriple = (triplet: string) => {
  const [w1, w2, w3] = triplet.split(" → ");
  return (
    <div className={rowWrap + " text-lg sm:text-xl font-semibold leading-tight"}>
      {/* w1 */}
      <span className="text-right whitespace-nowrap">
        {w1.slice(0, -1)}
        <span className="text-[#67FF56]">{w1.slice(-1)}</span>
      </span>

      {/* arrow 1 */}
      <span className="min-w-[1.5rem] text-center">⟶</span>

      {/* w2 */}
      <span className="text-center whitespace-nowrap">
        <span className="text-[#67FF56]">{w2[0]}</span>
        {w2.slice(1, -1)}
        <span className="text-[#67FF56]">{w2.slice(-1)}</span>
      </span>

      {/* arrow 2 */}
      <span className="min-w-[1.5rem] text-center">⟶</span>

      {/* w3 */}
      <span className="text-left whitespace-nowrap">
        <span className="text-[#67FF56]">{w3[0]}</span>
        {w3.slice(1)}
      </span>
    </div>
  );
};
