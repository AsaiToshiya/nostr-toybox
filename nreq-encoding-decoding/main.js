import * as nreq from "./nreq.js";

const handleChange = (event) => {
  const input = event.target;
  const tags = document.querySelectorAll("#tag");
  const isLast = input === tags[tags.length - 1];
  const br = input.nextElementSibling.nextElementSibling;
  isLast &&
    (() => {
      br.insertAdjacentHTML("afterend", tagHtml);
      const newTags = document.querySelectorAll("#tag");
      newTags[newTags.length - 1].addEventListener("change", handleChange);
    })();
};

const tagHtml = tags.innerHTML;

document.getElementById("tag").addEventListener("change", handleChange);

document.getElementById("encode").addEventListener("click", () => {
  const kinds = document
    .getElementById("kinds")
    .value.split(",")
    .filter((value) => value)
    .map((value) => parseInt(value));
  const tagElements = [...document.querySelectorAll("#tag")];
  const tagValuesElements = document.querySelectorAll("#tagValues");
  const tags = tagElements
    .filter((element) => element.value)
    .reduce((acc, cur, idx) => {
      const tag = "#" + cur.value;
      const tagValues = tagValuesElements[idx].value.split(",");
      const curValues = acc[tag] ?? [];
      return { ...acc, [tag]: [...curValues, ...tagValues] };
    }, {});
  const filter = {
    kinds: kinds.length ? kinds : undefined,
    ...tags,
  };
  document.getElementById("nreq").value = nreq.encode(filter);
});

document.getElementById("decode").addEventListener("click", () => {
  const filter = nreq.decode(document.getElementById("nreq").value);
  kinds.value = filter.kinds.length ? filter.kinds.join(",") : "";
  const tags = Object.keys(filter).filter((key) => key.startsWith("#"));
  document.getElementById("tags").innerHTML = tagHtml.repeat(tags.length + 1);
  const tagElements = document.querySelectorAll("#tag");
  tagElements.forEach((input) =>
    input.addEventListener("change", handleChange)
  );
  const tagValuesElements = document.querySelectorAll("#tagValues");
  tags.forEach((key, index) => {
    tagElements[index].value = key[1];
    tagValuesElements[index].value = filter[key].join(",");
  });
});
