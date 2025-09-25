import { BiSearch } from "react-icons/bi";
import { FaPen, FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const Beta = () => {
  return (
    <>
<div >
  {/* Desktop Navbar */}
  <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-16 items-center justify-around shadow-md">
    <a href="#" className="px-4 hover:text-primary">Home</a>
    <a href="#" className="px-4 hover:text-primary">Search</a>
    <a href="#" className="px-4 hover:text-primary">Reels</a>
    <a href="#" className="px-4 hover:text-primary">Activity</a>
  </nav>

  {/* Mobile/Tablet Navbar */}
  <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl">
    <div className="flex justify-around items-center h-16 px-4">
      <a href="#" className="flex flex-col items-center justify-center hover:text-primary group">
        <MdHome />
        <span className="text-xs">Home</span>
        <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
      </a>
      <a href="#" className="flex flex-col items-center justify-center hover:text-primary group">
        <BiSearch />
        <span className="text-xs">Explore</span>
        <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
      </a>
      <a href="#" className="flex flex-col items-center justify-center hover:text-primary group">
        
        <span className="text-xs">Reels</span>
        <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
      </a>
      <a href="#" className="flex flex-col items-center justify-center hover:text-primary group">
        <i className="far fa-heart text-2xl mb-1 text-current"></i>
        <span className="text-xs">Activity</span>
        <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
      </a>
    </div>
  </nav>
</div>


  
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Modal Title</h3>
          <p className="py-4">This is a modal content example.</p>
          <div className="alert alert-info shadow-lg">
            <div>
              <span>Success! DaisyUI alert is working.</span>
            </div>
          </div>
          <br />
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <FaUser />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <br />

          <form className="space-y-4 w-80">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Message"
            ></textarea>
            <button className="btn btn-primary w-full">Submit</button>
          </form>
          <br />

          <span className="badge">Default</span>
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-accent">Accent</span>
          <br />
          <br />
          <br />

          <div className="navbar bg-base-200">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">MyApp</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal p-0">
                <li>
                  <a>
                    <MdHome />
                    Home
                  </a>
                </li>
                <li>
                  <a>About</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="fab fab-flower">
            {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
            <div tabIndex={0} role="button" className="btn btn-circle btn-lg">
              <svg
                aria-label="New"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-6"
              >
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
            </div>

            {/* Main Action button replaces the original button when FAB is open */}
            {/* <button className="fab-main-action btn btn-circle btn-lg btn-primary">
              <svg
                aria-label="New post"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                  clipRule="evenodd"
                />
              </svg>
            </button> */}

            <button className="fab-main-action btn btn-circle btn-lg btn-primary">
              <FaPen />
            </button>
            <button className="btn btn-success btn-circle">hii</button>
            <button className="btn btn-info btn-circle">hii</button>
          </div>
          <figure className="hover-gallery max-w-60">
            <img src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
            <img src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
            <img src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
            <img src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
          </figure>
          <div className="modal-action">
            {/* Using label instead of button allows you to toggle the checkbox directly via the htmlFor attribute. */}
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <label htmlFor="my-modal" className="btn">
        Open Modal
      </label>
    </>
  );
};

export default Beta;
