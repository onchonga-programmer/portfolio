document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Photo fallback: show a "BB" monogram if images/bree.jpeg is missing
  const photo = document.querySelector(".polaroid img");
  if (photo) {
    const useMonogram = () => {
      const ph = document.createElement("div");
      ph.className = "ph";
      ph.setAttribute("aria-hidden", "true");
      ph.textContent = "BB";
      photo.replaceWith(ph);
    };
    if (photo.complete && photo.naturalWidth === 0) useMonogram();
    else photo.addEventListener("error", useMonogram, { once: true });
  }

  // Highlight the index entry for the section currently on screen
  const links = Array.from(document.querySelectorAll(".index a"));
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const targets = [document.getElementById("hero"), ...document.querySelectorAll("main section[id]")];

  const setActive = (id) => {
    links.forEach((a) => {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    });
    const link = byId.get(id === "hero" ? "top" : id);
    if (link) {
      link.classList.add("active");
      link.setAttribute("aria-current", "true");
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    targets.forEach((t) => t && observer.observe(t));
  }

  // Contact form: send to Formspree without leaving the page
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = form.querySelector("button[type=submit]");
      status.className = "";
      status.textContent = "Sending…";
      button.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const detail = data.errors ? data.errors.map((x) => x.message).join(", ") : "server error";
          throw new Error(detail);
        }
        form.reset();
        status.textContent = "Thank you, your message was sent. I’ll reply by email.";
        status.className = "ok";
      } catch (err) {
        status.textContent = "Your message was not sent (" + err.message + "). Try again, or email me directly.";
        status.className = "err";
      } finally {
        button.disabled = false;
      }
    });
  }
});
