import { useState } from "react";

export const useNeubau = () => {
  const [selections, setSelections] = useState({});
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);

  const handleOptionSelect = (category, option, neubauOptions) => {
    const foundCategory = neubauOptions.find((cat) => cat.name === category);
    if (!foundCategory) return;

    const selectedOption = foundCategory.options.find(
      (opt) => opt.name === option.name
    );

    if (!selectedOption) return;

    setSelections((prev) => ({ ...prev, [category]: selectedOption }));
    setSelectedOptionsList((prev) => {
      const updatedList = prev.filter((item) => item.category !== category);
      return [
        ...updatedList,
        {
          category,
          option: selectedOption.name,
          description: selectedOption.description || "Keine Beschreibung",
        },
      ];
    });
  };

  return { selections, selectedOptionsList, handleOptionSelect };
};

