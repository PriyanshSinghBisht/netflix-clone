import { Link } from "react-router-dom";
import { Input, Button } from "./ui";

const InputButton = () => {
  return (
    <div>
      <p className="text-text-secondary text-center text-sm gg:text-base gg:my-0 my-5 mx-4">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div className="mx-4 gg:mx-10 flex justify-center items-center my-4">
        <form className="w-full max-w-[600px]">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="flex-1">
              <Input
                label="Email address"
                type="text"
                name="email"
                required
              />
            </div>
            <Link to="/home" className="sm:-ml-px">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto h-[42px] rounded-lg sm:rounded-l-none px-6 text-base font-semibold"
              >
                Get Started &gt;
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputButton;
