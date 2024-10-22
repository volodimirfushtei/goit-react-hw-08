import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice.js";
import { selectNameFilter } from "../../redux/contacts/selectors.js";
const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={s.searchBox_container}>
      <label className={s.label}>
        <span className={s.span}>Find contacts by name or phone number</span>
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search..."
        />
      </label>
    </div>
  );
};

export default SearchBox;
