import React, { useState, useEffect, useRef } from "react";

const Pagination = ({ users, animal, activeIndex, setActiveIndex }) => {
  const [state, setState] = useState({
    sections: [],
    pages: [],
    currentSection: 0,
    currentPage: 0,
    lastAnimal: "cat",
  });

  const stateRef = useRef();
  stateRef.current = state;

  useEffect(() => {
    let pages = parseInt(users.length / 10) + (users.length % 10 ? 1 : 0);
    let sections = parseInt(pages / 10) + (pages % 10 ? 1 : 0);
    let currentPage = stateRef.current.currentPage;
    let currentSection = stateRef.current.currentSection;
    let lastAnimal = stateRef.current.lastAnimal;

    if (stateRef.current.lastAnimal === animal) {
      if (stateRef.current.currentPage === pages) {
        currentPage = stateRef.current.currentPage - 1;
        setActiveIndex(currentPage);
      }
      if (stateRef.current.currentSection === sections) {
        currentSection = stateRef.current.currentSection - 1;
      }
    } else {
      currentPage = 0;
      setActiveIndex(0);
      currentSection = 0;
      lastAnimal = animal;
    }
    setState({
      pages: Array.from(Array(pages).keys()),
      sections: Array.from(Array(sections).keys()),
      currentPage,
      currentSection,
      lastAnimal,
    });
  }, [users, animal, setActiveIndex]);

  const handleClickPage = (newIndex) => {
    setState((s) => ({
      ...s,
      currentPage: newIndex,
    }));
    setActiveIndex(newIndex);
  };

  const handleNextClick = () => {
    let nextPage = state.currentPage + 1;
    let nextSection = state.currentSection;
    if (parseInt(nextPage / 10) > state.currentSection) nextSection++;
    setState((s) => ({
      ...s,
      currentPage: nextPage,
      currentSection: nextSection,
    }));
    setActiveIndex(nextPage);
  };

  const handleBackClick = () => {
    let nextPage = state.currentPage - 1;
    let nextSection = state.currentSection;
    if (parseInt(nextPage / 10) < state.currentSection) nextSection--;
    setState((s) => ({
      ...s,
      currentPage: nextPage,
      currentSection: nextSection,
    }));
    setActiveIndex(nextPage);
  };

  const handleNextSection = () => {
    let nextSection = state.currentSection + 1;
    let nextPage = 10 * nextSection;
    setState((s) => ({
      ...s,
      currentPage: nextPage,
      currentSection: nextSection,
    }));
    setActiveIndex(nextPage);
  };

  const handleLastSection = () => {
    let nextSection = state.currentSection - 1;
    let nextPage = 10 * nextSection + 9;
    setState((s) => ({
      ...s,
      currentPage: nextPage,
      currentSection: nextSection,
    }));
    setActiveIndex(nextPage);
  };

  if (state.currentPage === undefined) return null;
  return (
    <div className="pagination__pages-numbers">
      <button
        className="pagination__button"
        onClick={handleBackClick}
        disabled={state.currentPage === state.pages[0]}
      >
        <span>&#10094;</span>
      </button>

      {state.currentSection !== state.sections[0] && (
        <span className={"pagination__page"} onClick={handleLastSection}>
          ...
        </span>
      )}
      {state.pages
        .slice(state.currentSection * 10, state.currentSection * 10 + 10)
        .map((el) => (
          <span
            key={`page-${el}`}
            className={`${
              activeIndex === el
                ? "pagination__page pagination__page_active-page"
                : "pagination__page"
            }`}
            onClick={() => {
              handleClickPage(el);
            }}
          >
            {el}
          </span>
        ))}
      {state.currentSection !== state.sections[state.sections.length - 1] && (
        <span className={"pagination__page"} onClick={handleNextSection}>
          ...
        </span>
      )}
      <button
        className="pagination__button"
        onClick={handleNextClick}
        disabled={state.currentPage === state.pages[state.pages.length - 1]}
      >
        <span>&#10095;</span>
      </button>
    </div>
  );
};

export default Pagination;
