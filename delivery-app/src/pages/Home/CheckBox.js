import { Checkbox } from "antd";

function FilterCheckBox(props) {
  const { items, selectedFilter = {}, setSelectedFilter, type } = props;
  const onChange = (e, eachItem) => {
    const checked = selectedFilter[type];
    if (selectedFilter[type]?.includes(eachItem)) {
      const newChecked = selectedFilter[type].filter(
        (item) => item !== eachItem
      );
      setSelectedFilter({ ...selectedFilter, [type]: newChecked });
    } else {
      checked.push(eachItem);
      setSelectedFilter({ ...selectedFilter, [type]: checked });
    }
  };
  return items?.map((eachItem) => (
    <>
      <Checkbox onChange={(e) => onChange(e, eachItem)}>{eachItem}</Checkbox>
      <br />
    </>
  ));
}

export default FilterCheckBox;
