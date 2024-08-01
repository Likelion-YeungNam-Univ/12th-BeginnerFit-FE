import styled from "styled-components";
export default function Pagination({ total, limit, page, setPage }) {
  //페이지 올림
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <nav>
        <LeftButton onClick={() => setPage(page - 1)} disabled={page == 1}>
          &lt;
        </LeftButton>
        {Array(numPages)
          .fill()
          .map((v, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <RightButton
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </RightButton>
      </nav>
    </>
  );
}
const LeftButton = styled.button`
  border: none;
  width: 1rem;
  height: 2rem;
  border-radius: 1rem 0 0 1rem;
  cursor: pointer;
`;
const RightButton = styled.button`
  border: none;
  width: 1rem;
  height: 2rem;
  border-radius: 0 1rem 1rem 0;
  cursor: pointer;
`;
const Button = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray01};
  transition: all 0.5s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray05};
  }
`;
