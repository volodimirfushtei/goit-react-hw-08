import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
const Home = () => {
  return (
    <div>
      <h2 className="text-3xl text-center">
        <ContactForm />
        <SearchBox />
        <ContactList />
      </h2>
    </div>
  );
};

export default Home;
