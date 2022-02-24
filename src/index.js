const ul = document.querySelector("ul");
ul.addEventListener("click", async (ev) => {
  if (ev.target.tagName === "LI") {
    const id = ev.target.getAttribute("data-id");
    await axios.delete(`/api/employees/${id}`);
    init();
  }
});

const init = async () => {
  const response = await axios.get("/api/employees");
  const employee = response.data;
  const html = employee
    .map((employee) => {
      return `<li data-id = '${employee.id}'>${employee.name}</li>`;
    })
    .join("");
  ul.innerHTML = html;
};
init();
