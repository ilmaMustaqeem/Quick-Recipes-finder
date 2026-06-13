# Quick-Recipes-finder
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DishForge Pro - Recipe Manager</title>
    <!-- FontAwesome Icons Link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- ================= ALWAYS VISIBLE HEADER ================= -->
    <header class="main-header">
        <div class="header-left">
            <button id="menu-toggle-btn" class="icon-btn hidden">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <span class="logo"><i class="fa-solid fa-utensils"></i> DishForge</span>
        </div>
        <div class="header-right">
            <span id="user-display-name">Welcome, Guest</span>
        </div>
    </header>

    <!-- ================= MAIN CONTAINER ================= -->
    <div class="main-wrapper">

        <!-- ================= AUTHENTICATION PAGE ================= -->
        <section id="auth-page" class="page">
            <div class="auth-container">
                <h2>Create Account</h2>
                <p>Join DishForge to manage your favorite recipes</p>
                <form id="signup-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="signup-name" required placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="signup-email" required placeholder="name@example.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="signup-password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn btn-block">Sign Up</button>
                </form>
            </div>
        </section>

        <!-- ================= APP WRAPPER (MAIN APP AFTER LOGIN) ================= -->
        <div id="app-wrapper" class="hidden">
            
            <!-- SIDEBAR NAVIGATION -->
            <aside id="sidebar" class="sidebar">
                <div class="sidebar-header">
                    <h3>Menu</h3>
                    <button id="close-sidebar-btn" class="icon-btn">&times;</button>
                </div>
                <nav class="sidebar-links">
                    <a href="#" class="nav-link active" data-target="home-section"><i class="fa-solid fa-house"></i> Home</a>
                    <a href="#" class="nav-link" data-target="dashboard-section"><i class="fa-solid fa-chart-pie"></i> Dashboard</a>
                    <a href="#" class="nav-link" data-target="about-section"><i class="fa-solid fa-circle-info"></i> About Us</a>
                </nav>
            </aside>

            <!-- MAIN CONTENT AREA -->
            <main class="content-area">
                
                <!-- ====== HOME SECTION ====== -->
                <section id="home-section" class="app-section">
                    <div class="section-header">
                        <div class="search-box">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="search-bar" placeholder="Search recipes by name or ingredients...">
                        </div>
                        <button id="open-add-modal-btn" class="btn"><i class="fa-solid fa-plus"></i> Add Recipe</button>
                    </div>

                    <div id="recipes-grid" class="recipes-grid"></div>
                </section>
                <!-- ====== DASHBOARD SECTION ====== -->
                <section id="dashboard-section" class="app-section hidden">
                    <h2>Your Analytics Dashboard</h2>
                    <div class="dashboard-grid">
                        <div class="dash-card">
                            <h3>Total Recipes</h3>
                            <p id="dash-total-recipes">0</p>
                        </div>
                        <div class="dash-card">
                            <h3>Favorite Recipes</h3>
                            <p id="dash-fav-recipes">0</p>
                        </div>
                    </div>
                </section>

                <!-- ====== ABOUT SECTION ====== -->
                <section id="about-section" class="app-section hidden">
                    <h2>About DishForge</h2>
                    <p>DishForge is your ultimate digital cookbook. Add your custom culinary creations, filter through your pantry list, track analytics on your dashboard, and curate your top-tier meals all in one unified local interface.</p>
                    <p>Built with pure Vanilla JavaScript, HTML5, and CSS3.</p>
                </section>

            </main>
        </div>

    </div>

    <!-- ================= ALWAYS VISIBLE FOOTER ================= -->
    <footer class="main-footer">
        <div class="footer-content">
            <p>&copy; 2026 DishForge Pro. All Rights Reserved.</p>
            <div class="footer-socials">
                <a href="#"><i class="fa-brands fa-github"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin"></i></a>
            </div>
        </div>
    </footer>

    <!-- ================= MODALS SYSTEM (POPUPS) ================= -->
    <div id="details-modal" class="modal-overlay hidden">
        <div class="modal-content">
            <button id="close-details-btn" class="modal-close-btn">&times;</button>
            <div id="modal-body-content"></div>
        </div>
    </div>

    <div id="add-recipe-modal" class="modal-overlay hidden">
        <div class="modal-content">
            <button id="close-add-modal-btn" class="modal-close-btn">&times;</button>
            <h2>Add New Recipe</h2>
            <form id="add-recipe-form">
                <div class="form-group">
                    <label>Recipe Title</label>
                    <input type="text" id="recipe-title" required placeholder="e.g., Spicy Arrabiata Pasta">
                </div>
                <div class="form-group">
                    <label>Ingredients (Comma separated)</label>
                    <input type="text" id="recipe-ingredients" required placeholder="e.g., pasta, tomato, chili flakes">
                </div>
                <div class="form-group">
                    <label>Instructions / Steps</label>
                    <textarea id="recipe-instructions" rows="4" required placeholder="Step 1. Boil pasta..."></textarea>
                </div>
                <div class="form-group">
                    <label>Image URL (Optional)</label>
                    <input type="url" id="recipe-image" placeholder="https://example.com/image.jpg">
                </div>
                <button type="submit" class="btn btn-block">Save Recipe</button>
            </form>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
