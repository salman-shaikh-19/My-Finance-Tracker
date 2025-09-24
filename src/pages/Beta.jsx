import { FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const Beta=()=>{
    return (
        <>
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
    )
}

export default Beta;