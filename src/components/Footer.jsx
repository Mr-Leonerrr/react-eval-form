const Footer = () => {
  return (
    <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://mrleoner.com.co" target={"_blank"} rel={"noreferrer"} class="hover:underline">
          Leonardo Natera
        </a>
        . All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="https://linkedin.com/in/leonardo-natera" target={"_blank"} rel={"noreferrer"} class="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="https://github.com/Mr-Leonerrr" target={"_blank"} rel={"noreferrer"} class="mr-4 hover:underline md:mr-6">
            Github
          </a>
        </li>
        <li>
          <a href="mailto:hello@mrleoner.com.co" class="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
