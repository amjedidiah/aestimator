const makeCardPulse = (input) => {
  makeCardNormal(input);
  input.parentElement.parentElement.parentElement.classList.add("active");
};

const makeCardNormal = () => $(".card").removeClass("active");

const submitForm = (form) => {
  console.log(form);
};

$("form#inputForm").on(
  "submit",
  (e) => (e.preventDefault(), submitForm(e.target))
);

$(`input[type="number"]`).on("focus", (e) => makeCardPulse(e.target));
$(`input[type="number"]`).on("change", () => makeCardNormal());
$(`.btn-done`).on("click", () => makeCardNormal());

// Disable console logging
console.log = function () {};
console.info = function () {};
