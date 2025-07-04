/* utils/formatters.tsx */

const pairRowStyle = `
  grid grid-cols-[auto_1.5rem_auto] gap-1 items-baseline
`;

const tripleRowStyle = `
  grid grid-cols-[auto_1.5rem_auto_1.5rem_auto] gap-1 items-baseline
`;

export const formatOne = (w: string) => (
  <div className="text-center">{w}</div>
);

export const formatPair = (pair: string) => {
  const [w1, w2] = pair.split(" → ");
  return (
    <div className={pairRowStyle}>
      {/* Word 1 */}
      <div className="text-right">
        {w1.slice(0, -1)}
        <span className="text-[#67FF56] font-bold">{w1.slice(-1)}</span>
      </div>

      {/* Arrow */}
      <div className="text-center">⟶</div>

      {/* Word 2 */}
      <div className="text-left">
        <span className="text-[#67FF56] font-bold">{w2[0]}</span>
        {w2.slice(1)}
      </div>
    </div>
  );
};

export const formatTriple = (chain: string) => {
  const [w1, w2, w3] = chain.split(" → ");
  return (
    <div className={tripleRowStyle}>
      {/* Word 1 */}
      <div className="text-right">
        {w1.slice(0, -1)}
        <span className="text-[#67FF56] font-bold">{w1.slice(-1)}</span>
      </div>

      {/* Arrow 1 */}
      <div className="text-center">⟶</div>

      {/* Word 2 */}
      <div className="text-center">
        <span className="text-[#67FF56] font-bold">{w2[0]}</span>
        {w2.slice(1, -1)}
        <span className="text-[#67FF56] font-bold">{w2.slice(-1)}</span>
      </div>

      {/* Arrow 2 */}
      <div className="text-center">⟶</div>

      {/* Word 3 */}
      <div className="text-left">
        <span className="text-[#67FF56] font-bold">{w3[0]}</span>
        {w3.slice(1)}
      </div>
    </div>
  );
};
