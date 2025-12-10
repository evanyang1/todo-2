import useUserStore from "../store/userStore";

const Header = () => {
  return (
    <header className="p-4 flex justify-end">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded 
      duration-300 transition-colors"
        onClick={() => {
          useUserStore.getState().clearUser();
          // Use router navigation instead of window.location
          window.history.pushState({}, "", "/");
          window.dispatchEvent(new PopStateEvent("popstate"));
          // window.location.href = "/"; --- IGNORE ---
        }}
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
