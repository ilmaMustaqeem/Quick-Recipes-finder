// ================= 1. DEFAULT RECIPES DATA =================
const defaultRecipes = [
    {
        id: "rec-1",
        title: "Classic Tomato Pasta",
        ingredients: "pasta, tomato, garlic, olive oil, basil",
        instructions: "Step 1: Boil pasta in salted water.\nStep 2: Heat olive oil in a pan and sauté minced garlic.\nStep 3: Add crushed tomatoes, cook till sauce thickens, and toss in the pasta with fresh basil.",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
    },
    {
        id: "rec-2",
        title: "Crispy French Fries",
        ingredients: "potato, oil, salt, peri-peri spice",
        instructions: "Step 1: Cut potatoes into equal batons.\nStep 2: Soak in ice-cold water for 30 mins, then dry completely.\nStep 3: Deep fry until golden brown, drain excess oil, and sprinkle salt or peri-peri.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
        id: "rec-3",
        title: "Restaurant Style Paneer Tikka",
        ingredients: "paneer, capsicum, onion, yogurt, tandoori masala",
        instructions: "Step 1: Cut paneer, onions, and capsicum into cubes.\nStep 2: Marinate them in thick yogurt, ginger-garlic paste, and tandoori masala for 1 hour.\nStep 3: Skewer them and grill in an oven or on a hot tawa until slightly charred. Serve hot with mint chutney.",
        image: "https://images.unsplash.com/photo-1567184109411-47a7a39ea897?w=500"
    },
    {
        id: "rec-4",
        title: "Crispy Masala Dosa",
        ingredients: "dosa batter, potato, mustard seeds, turmeric",
        instructions: "Step 1: Prepare potato masala by sautéing boiled potatoes with mustard seeds, curry leaves, onions, and turmeric.\nStep 2: Heat a non-stick tawa, spread a ladle of dosa batter in circular motion, and apply butter on edges.\nStep 3: Once crispy, place the potato masala in the center, fold it, and serve with coconut chutney.",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
    },
    {
        id: "rec-5",
        title: "Delhi Style Chole Bhature",
        ingredients: "chickpeas, maida, yogurt, spices, onion",
        instructions: "Step 1: Soak chickpeas overnight and cook with rich Indian spices till tender.\nStep 2: Make a soft dough of maida, yogurt, and a pinch of baking soda. Let it rest for 2 hours.\nStep 3: Roll into ovals, deep fry in smoking hot oil until fully puffed, and serve with hot chole and pickles.",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500"
    }
];

// === LOCAL STORAGE SE DATA NIKALNA (या पहली बार डिफ़ॉल्ट सेट करना) ===
let recipes = JSON.parse(localStorage.getItem('df_recipes')) || [...defaultRecipes]; 
let favorites = JSON.parse(localStorage.getItem('df_favorites')) || [];
let currentUser = JSON.parse(localStorage.getItem('df_user')) || null;

// ================= 2. DOM ELEMENTS =================
const authPage = document.getElementById('auth-page');
const appWrapper = document.getElementById('app-wrapper');
const signupForm = document.getElementById('signup-form');
const userDisplayName = document.getElementById('user-display-name');
const menuToggleBtn = document.getElementById('menu-toggle-btn');

const sidebar = document.getElementById('sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const navLinks = document.querySelectorAll('.nav-link');

const recipesGrid = document.getElementById('recipes-grid');
const searchBar = document.getElementById('search-bar');
const openAddModalBtn = document.getElementById('open-add-modal-btn');
const addRecipeModal = document.getElementById('add-recipe-modal');
const addRecipeForm = document.getElementById('add-recipe-form');
const closeAddModalBtns = document.querySelectorAll('#close-add-modal-btn');

const detailsModal = document.getElementById('details-modal');
const closeDetailsBtn = document.getElementById('close-details-btn');
const modalBodyContent = document.getElementById('modal-body-content');

const dashTotalRecipes = document.getElementById('dash-total-recipes');
const dashFavRecipes = document.getElementById('dash-fav-recipes');

// ================= 3. AUTHENTICATION LOGIC =================
function checkAuth() {
    if (currentUser) {
        authPage.classList.add('hidden');
        appWrapper.classList.remove('hidden');
        menuToggleBtn.classList.remove('hidden'); 
        userDisplayName.innerText = Welcome, ${currentUser.name};
        renderRecipes(recipes);
        updateDashboard();
    } else {
        authPage.classList.remove('hidden');
        appWrapper.classList.add('hidden');
        menuToggleBtn.classList.add('hidden');
        userDisplayName.innerText = "Welcome, Guest";
    }
}

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    
    currentUser = { name, email };
    // LocalStorage में यूजर सेव करें
    localStorage.setItem('df_user', JSON.stringify(currentUser));
    
    checkAuth();
});

// ================= 4. SIDEBAR SYSTEM =================
menuToggleBtn.addEventListener('click', () => sidebar.classList.add('open'));
closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.classList.remove('open'); 
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const targetSectionId = link.getAttribute('data-target');
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetSectionId).classList.remove('hidden');

        if(targetSectionId === 'dashboard-section') {
            updateDashboard();
        }
    });
});

// ================= 5. RECIPE RENDER SYSTEM =================
function renderRecipes(recipesToRender) {
    recipesGrid.innerHTML = "";
    if(recipesToRender.length === 0) {
        recipesGrid.innerHTML = <p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No recipes found.</p>;
        return;
    }
    recipesToRender.forEach(recipe => {
        const isFav = favorites.includes(recipe.id) ? 'active' : '';
        const card = document.createElement('div');
        card.className = 'recipe-card';
        const imgUrl = recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500";

        card.innerHTML = 
            <div class="card-img-wrapper">
                <img src="${imgUrl}" alt="${recipe.title}">
                <button class="fav-btn ${isFav}" onclick="toggleFavorite('${recipe.id}')">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
            <div class="card-body">
                <h3>${recipe.title}</h3>
                <p class="card-ingredients"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <div class="card-footer">
                    <button class="btn" onclick="viewDetails('${recipe.id}')">View Details</button>
                    <button class="delete-btn" onclick="deleteRecipe('${recipe.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        ;
        recipesGrid.appendChild(card);
    });
}

// ================= 6. SEARCH FILTER =================
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(searchTerm) || recipe.ingredients.toLowerCase().includes(searchTerm);
    });
    renderRecipes(filteredRecipes);
});

// ================= 7. MODALS LOGIC =================
function viewDetails(id) {
    const recipe = recipes.find(r => r.id === id);
    if(!recipe) return;
    const imgUrl = recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500";
    modalBodyContent.innerHTML = 
        <img src="${imgUrl}" alt="${recipe.title}" class="modal-img">
        <h2>${recipe.title}</h2>
        <h4>Ingredients:</h4>
        <p>${recipe.ingredients}</p>
        <h4>Instructions:</h4>
        <p style="white-space: pre-line; margin-top: 5px;">${recipe.instructions}</p>
    ;
    detailsModal.classList.remove('hidden');
}
closeDetailsBtn.addEventListener('click', () => detailsModal.classList.add('hidden'));

openAddModalBtn.addEventListener('click', () => addRecipeModal.classList.remove('hidden'));
closeAddModalBtns.forEach(btn => btn.addEventListener('click', () => addRecipeModal.classList.add('hidden')));

// नई रेसिपी ऐड करना (With LocalStorage)
addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRecipe = {
        id: "rec-" + Date.now(), 
        title: document.getElementById('recipe-title').value,
        ingredients: document.getElementById('recipe-ingredients').value,
        instructions: document.getElementById('recipe-instructions').value,
        image: document.getElementById('recipe-image').value
    };
    recipes.push(newRecipe);
    
    // LocalStorage में रेसिपी लिस्ट अपडेट करें
    localStorage.setItem('df_recipes', JSON.stringify(recipes));
    
    renderRecipes(recipes);
    updateDashboard();
    addRecipeForm.reset();
    addRecipeModal.classList.add('hidden');
});

// रेसिपी डिलीट करना (With LocalStorage)
window.deleteRecipe = function(id) {
    if(confirm("Are you sure you want to delete this recipe?")) {
        recipes = recipes.filter(r => r.id !== id);
        favorites = favorites.filter(favId => favId !== id);
        
        // LocalStorage अपडेट करें
        localStorage.setItem('df_recipes', JSON.stringify(recipes));
        localStorage.setItem('df_favorites', JSON.stringify(favorites));
        
        renderRecipes(recipes);
        updateDashboard();
    }
}

// फेवरेट/लाइक करना (With LocalStorage)
window.toggleFavorite = function(id) {
    if(favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    
    // LocalStorage में फेवरेट लिस्ट सेव करें
    localStorage.setItem('df_favorites', JSON.stringify(favorites));
    
    const searchTerm = searchBar.value.toLowerCase();
    const currentList = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(searchTerm) || recipe.ingredients.toLowerCase().includes(searchTerm);
    });
    renderRecipes(currentList);
    updateDashboard();
}

function updateDashboard() {
    dashTotalRecipes.innerText = recipes.length;
    dashFavRecipes.innerText = favorites.length;
}

// ऐप लोड होते ही ऑथेंटिकेशन चेक करें
checkAuth();
