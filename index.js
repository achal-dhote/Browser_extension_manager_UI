const extensions = [
    { icon: "🛠️", name: "DevLens", desc: "Inspect page layouts", status: "active" },
    { icon: "🎨", name: "StyleSpy", desc: "Copy CSS from elements", status: "active" },
    { icon: "⚡", name: "SpeedBoost", desc: "Accelerate page loading", status: "inactive" },
    { icon: "🧾", name: "JSONWizard", desc: "Prettify JSON responses", status: "active" },
    { icon: "🗂️", name: "TabMaster Pro", desc: "Manage tab groups", status: "active" },
    { icon: "🖥️", name: "ViewportBuddy", desc: "Simulate resolutions", status: "inactive" },
    { icon: "📝", name: "Markup Notes", desc: "Overlay comments", status: "inactive" },
    { icon: "📐", name: "GridGuides", desc: "Add design guides", status: "inactive" },
    { icon: "🎛️", name: "Palette Picker", desc: "Extract color palettes", status: "inactive" },
];

const list = document.getElementById("extensionList");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggleBtn = document.getElementById("themeToggle");

function render(data) {
    list.innerHTML = "";
    data.forEach(ext => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${ext.icon} ${ext.name}</h3>
            <p>${ext.desc}</p>
            <div class="actions">
              <button>Remove</button>
              <div class="toggle ${ext.status === "active" ? "active" : ""}"></div>
            </div>
        `;
        list.appendChild(card);
    });
}

function filterExtensions(type) {
    let filtered = extensions;
    if (type !== "all") {
        filtered = extensions.filter(e => e.status === type);
    }
    render(filtered);
}

// ✅ Filter Buttons Logic (fixed)
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const activeBtn = document.querySelector(".filters .active");
        if (activeBtn) activeBtn.classList.remove("active");

        btn.classList.add("active");
        filterExtensions(btn.dataset.filter);
    });
});

// ✅ Theme Toggle
function updateThemeIcon() {
    themeToggleBtn.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
}

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    updateThemeIcon();
});

// ✅ Load saved theme on startup
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}
updateThemeIcon();

// ✅ Initial Render
render(extensions);