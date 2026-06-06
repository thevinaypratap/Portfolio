/**
 * Vinay Pratap's Portfolio JavaScript Engine
 * Handles core UI animations, theme managers, mobile navigation,
 * custom terminal logic, filtering, and interactive simulator modals.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Navigation & Scroll Effects
     ========================================================================== */
  const header = document.getElementById('main-header');
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const sections = document.querySelectorAll('main section');
  const navAnchors = document.querySelectorAll('.nav-links a');

  // Add background shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll active link highlight
    let currentSection = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      const sectionHeight = sec.clientHeight;
      if (window.scrollY >= (sectionTop - 250)) {
        currentSection = sec.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === `#${currentSection}`) {
        anchor.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('open');
  });

  // Close mobile menu when nav link is clicked
  navAnchors.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('open');
    });
  });


  /* ==========================================================================
     2. Custom Theme & Mode Selector
     ========================================================================== */
  const body = document.body;
  const accentButtons = document.querySelectorAll('.accent-btn');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Accent Switcher
  accentButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove all theme class names
      body.classList.remove('theme-cyan', 'theme-emerald', 'theme-violet');
      accentButtons.forEach(b => b.classList.remove('active'));

      const selectedTheme = btn.getAttribute('data-theme');
      body.classList.add(`theme-${selectedTheme}`);
      btn.classList.add('active');

      // Sync terminal prompt color indirectly via CSS vars
    });
  });

  // Dark/Light Mode Toggler
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggleBtn.querySelector('i');
    if (body.classList.contains('light-mode')) {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });


  /* ==========================================================================
     2.1 Short Bio Toggle & Avatar Image Toggle
     ========================================================================== */
  const viewBioDetailsBtn = document.getElementById('view-bio-details-btn');
  const bioDetailsPanel = document.getElementById('bio-details-panel');

  if (viewBioDetailsBtn && bioDetailsPanel) {
    viewBioDetailsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      bioDetailsPanel.classList.toggle('active');
      viewBioDetailsBtn.classList.toggle('active');
      
      const isActive = bioDetailsPanel.classList.contains('active');
      if (isActive) {
        viewBioDetailsBtn.innerHTML = 'Close Details <i class="fa-solid fa-chevron-up"></i>';
      } else {
        viewBioDetailsBtn.innerHTML = 'Read Full Bio <i class="fa-solid fa-chevron-down"></i>';
      }
    });
  }

  const avatarToggleBtn = document.getElementById('avatar-toggle-btn');
  const heroAvatar = document.getElementById('hero-avatar');

  if (avatarToggleBtn && heroAvatar) {
    avatarToggleBtn.addEventListener('click', () => {
      const currentType = heroAvatar.getAttribute('data-type');
      
      // Fade out avatar
      heroAvatar.style.opacity = '0.3';
      heroAvatar.style.transform = 'scale(0.97)';
      
      setTimeout(() => {
        if (currentType === 'animated') {
          // Switch to real suit photo
          heroAvatar.setAttribute('src', 'assets/real_suit.jpg');
          heroAvatar.setAttribute('data-type', 'real');
          avatarToggleBtn.innerHTML = '<i class="fa-solid fa-user-ninja"></i> <span>Vector Style</span>';
          avatarToggleBtn.setAttribute('title', 'Switch to Animated Vector Art');
        } else {
          // Switch to animated vector photo
          heroAvatar.setAttribute('src', 'assets/avatar_animated.png');
          heroAvatar.setAttribute('data-type', 'animated');
          avatarToggleBtn.innerHTML = '<i class="fa-solid fa-user-astronaut"></i> <span>Animated Style</span>';
          avatarToggleBtn.setAttribute('title', 'Switch to Real Photo');
        }
        // Fade in avatar
        heroAvatar.style.opacity = '1';
        heroAvatar.style.transform = 'scale(1)';
      }, 250);
    });
  }


  /* ==========================================================================
     3. Hero Typing Text Animation
     ========================================================================== */
  const words = [
    "Fullstack Developer.",
    "Healthcare IT Consultant.",
    "Cloud Solutions Architect.",
    "Cognizant Analyst."
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  const typingDelay = 120;
  const erasingDelay = 60;
  const newWordDelay = 2000;

  function typeEffect() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIdx === currentWord.length) {
      delay = newWordDelay;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  // Initial typing trigger
  if (typedTextSpan) {
    setTimeout(typeEffect, 1000);
  }


  /* ==========================================================================
     4. Interactive Experience Disclosure (Timeline)
     ========================================================================== */
  const timelineCards = document.querySelectorAll('.timeline-card');

  timelineCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Toggle expanded class
      card.classList.toggle('expanded');
      
      const indicator = card.querySelector('.timeline-toggle-indicator');
      const isExpanded = card.classList.contains('expanded');
      
      if (isExpanded) {
        indicator.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Collapse Details';
      } else {
        indicator.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Expand Details';
      }
    });
  });


  /* ==========================================================================
     5. Skill Cards Filter & Dial Metrics
     ========================================================================== */
  const skillsTabBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');
  const dialProgresses = document.querySelectorAll('.dial-progress');

  skillsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      
      skillCategoryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Animate skill dials on scroll reveal
  const observerOptions = {
    threshold: 0.2
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressCircles = entry.target.querySelectorAll('.dial-progress');
        progressCircles.forEach(circle => {
          const percent = circle.getAttribute('data-percent');
          // Circle length is 2*PI*R = 2 * 3.14 * 45 = 282.7 (283)
          const offset = 283 - (283 * percent) / 100;
          circle.style.strokeDashoffset = offset;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }


  /* ==========================================================================
     6. Credentials / Certifications Filter
     ========================================================================== */
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const issuerFilter = btn.getAttribute('data-issuer');
      
      certCards.forEach(card => {
        const issuer = card.getAttribute('data-issuer');
        if (issuerFilter === 'all' || issuer === issuerFilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ==========================================================================
     7. Custom Developer Terminal CLI
     ========================================================================== */
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const termShortcutBtns = document.querySelectorAll('.term-shortcut-btn');

  const profileData = {
    about: "I'm a Fullstack Developer and Healthcare Product Consultant at Cognizant, Chennai.\nWorking on enterprise healthcare IT systems (Facets, Informatica) and cloud computing.",
    skills: "- Frontend: React.js, JavaScript, CSS3, HTML5\n- Backend: ASP.NET Core, C# Web API, Entity Framework\n- Databases: SQL Server, MySQL\n- Cloud/DevOps: Azure, Google Cloud (GCP), Azure DevOps, Git\n- Healthcare/Data: Facets Platform, Informatica PowerCenter, ETL Data Pipelines",
    experience: "- Developer (Sep 2025 - Present): Healthcare Consulting, Facets, ASP.NET, Informatica.\n- Programmer Analyst Trainee (Sep 2024 - Sep 2025): Fullstack React/.NET, Azure.\n- GenC Intern (Jan 2024 - Aug 2024): E-Commerce Watch Shopping application.",
    certs: "- Context Engineering Foundation (Cognizant, 2026)\n- AI Assisted Code Companion (Cognizant, 2026)\n- Prompt Engineering Foundation (Cognizant, 2026)\n- Microsoft Azure Fundamentals (Microsoft, 2025)\n- Google Cloud Digital Leader (Google, 2025)\n- SQL Basic (HackerEarth, 2023)",
    contact: "Email: Vinaywizard7172@gmail.com\nLinkedIn: linkedin.com/in/vinaypratap03\nLocation: Chennai, Tamil Nadu, India"
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        executeCommand(cmd);
      }
    });

    termShortcutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        executeCommand(cmd);
      });
    });
  }

  function executeCommand(cmd) {
    // Log prompt line first
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="terminal-prompt">vinay@portfolio:~$</span> ${cmd}`;
    
    // Insert before the input line
    const inputLine = terminalBody.querySelector('.terminal-input-line');
    terminalBody.insertBefore(promptLine, inputLine);

    if (!cmd) return;

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line output';

    switch (cmd) {
      case 'help':
        outputLine.textContent = `Available commands:\n  about       - Short introduction of my profile\n  skills      - List my core programming languages & tech stack\n  experience  - Show my developer roles history\n  certs       - View my professional certifications\n  contact     - Get my contact endpoints\n  clear       - Clear the console outputs\n  secret      - Reveals a special Easter Egg!`;
        break;
      case 'about':
        outputLine.textContent = profileData.about;
        break;
      case 'skills':
        outputLine.textContent = profileData.skills;
        break;
      case 'experience':
        outputLine.textContent = profileData.experience;
        break;
      case 'certs':
        outputLine.textContent = profileData.certs;
        break;
      case 'contact':
        outputLine.textContent = profileData.contact;
        break;
      case 'clear':
        // Remove all lines except the current input line
        const lines = terminalBody.querySelectorAll('.terminal-line');
        lines.forEach(line => line.remove());
        const welcome = terminalBody.querySelector('.terminal-welcome');
        if (welcome) welcome.remove();
        return;
      case 'secret':
        outputLine.textContent = "🛡️ SECURE ENVIRONMENT ACCESS GRANTED!\nEaster Egg: The database is running smoothly! Feel free to checkout my Watch Shop Simulator in the projects grid!";
        break;
      default:
        outputLine.className = 'terminal-line error';
        outputLine.textContent = `Command not found: '${cmd}'. Type 'help' for available commands.`;
    }

    terminalBody.insertBefore(outputLine, inputLine);
    
    // Auto scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }


  /* ==========================================================================
     8. Modal Simulators Management
     ========================================================================== */
  const openModalLinks = document.querySelectorAll('[data-project-sim]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  openModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectType = link.getAttribute('data-project-sim');
      const targetModal = document.getElementById(`${projectType}-modal`);
      
      if (targetModal) {
        targetModal.classList.add('active');
        
        // Initial setup for specific simulator
        if (projectType === 'data') {
          drawClusteringGraph('all');
        }
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlays.forEach(modal => modal.classList.remove('active'));
    });
  });

  // Close modal when clicking outside content container
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });


  /* ==========================================================================
     8.1 Watch Shop Cart Simulator Logic
     ========================================================================== */
  const addCartSimBtns = document.querySelectorAll('.add-to-cart-sim');
  const simCartItems = document.getElementById('sim-cart-items');
  const simCartTotal = document.getElementById('sim-cart-total');
  const simCheckoutBtn = document.getElementById('sim-checkout-btn');
  
  let watchCart = [];

  addCartSimBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));

      // Check if item already exists in cart
      const existingItem = watchCart.find(item => item.name === name);
      if (existingItem) {
        existingItem.qty++;
      } else {
        watchCart.push({ name, price, qty: 1 });
      }

      renderSimCart();
    });
  });

  function renderSimCart() {
    if (watchCart.length === 0) {
      simCartItems.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; margin-top: 2rem;">Cart is empty.</p>';
      simCartTotal.textContent = '$0.00';
      return;
    }

    simCartItems.innerHTML = '';
    let total = 0;

    watchCart.forEach(item => {
      const itemCost = item.price * item.qty;
      total += itemCost;

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div style="font-size: 0.85rem;">
          <strong>${item.name}</strong> x${item.qty}
        </div>
        <div style="font-size: 0.85rem; font-family: var(--font-mono);">
          $${itemCost.toFixed(2)}
        </div>
      `;
      simCartItems.appendChild(row);
    });

    simCartTotal.textContent = `$${total.toFixed(2)}`;
  }

  simCheckoutBtn.addEventListener('click', () => {
    if (watchCart.length === 0) {
      alert('Please add items to your cart first!');
      return;
    }

    simCheckoutBtn.disabled = true;
    simCheckoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Checkout...';

    setTimeout(() => {
      alert(`🎉 Checkout successful! Web API backend simulation processed your transaction total of ${simCartTotal.textContent}.`);
      watchCart = [];
      renderSimCart();
      simCheckoutBtn.disabled = false;
      simCheckoutBtn.innerHTML = 'Simulate Checkout';
    }, 1500);
  });


  /* ==========================================================================
     8.2 Workforce Pattern Clustering Data Graph Logic
     ========================================================================== */
  const clusterTabBtns = document.querySelectorAll('.node-group-selector button');
  const clusterSvg = document.getElementById('cluster-svg');
  const clusterInfoBox = document.getElementById('cluster-info-box');

  const clusterMetadata = {
    all: {
      title: "Segmentation Insight: Combined Workforce",
      desc: "This dataset models 12,450 employee records. Color indicates clustering assignments using Python SciPy algorithms based on tenure and engagement quotients."
    },
    1: {
      title: "Cluster 1: High Performance (Teal Nodes)",
      desc: "High performance & high tenure employees. Represents 28% of workforce. Characterized by high engagement scores and low attrition levels."
    },
    2: {
      title: "Cluster 2: Mid-Level Growth (Purple Nodes)",
      desc: "Mid engagement and career growth. Represents 34% of workforce. Good potential for executive training leadership programs."
    },
    3: {
      title: "Cluster 3: Early Career / Generalists (Blue Nodes)",
      desc: "Early career / junior developers. Represents 21% of workforce. Strong focus on upskilling programs and certification pathways."
    }
  };

  // Simulated data nodes
  const employeeNodes = [
    { x: 50, y: 70, cluster: 1, name: "Employee A", perf: 92, eng: 88 },
    { x: 110, y: 55, cluster: 1, name: "Employee B", perf: 85, eng: 94 },
    { x: 80, y: 110, cluster: 1, name: "Employee C", perf: 89, eng: 90 },
    { x: 150, y: 90, cluster: 1, name: "Employee D", perf: 95, eng: 85 },
    { x: 220, y: 60, cluster: 2, name: "Employee E", perf: 72, eng: 78 },
    { x: 260, y: 120, cluster: 2, name: "Employee F", perf: 68, eng: 82 },
    { x: 190, y: 150, cluster: 2, name: "Employee G", perf: 75, eng: 74 },
    { x: 290, y: 95, cluster: 2, name: "Employee H", perf: 70, eng: 80 },
    { x: 60, y: 220, cluster: 3, name: "Employee I", perf: 55, eng: 60 },
    { x: 120, y: 250, cluster: 3, name: "Employee J", perf: 58, eng: 68 },
    { x: 180, y: 210, cluster: 3, name: "Employee K", perf: 62, eng: 64 },
    { x: 240, y: 240, cluster: 3, name: "Employee L", perf: 60, eng: 62 }
  ];

  clusterTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      clusterTabBtns.forEach(b => b.classList.remove('active-sim-tab'));
      btn.classList.add('active-sim-tab');

      const clusterId = btn.getAttribute('data-cluster');
      drawClusteringGraph(clusterId);

      const info = clusterMetadata[clusterId];
      if (info) {
        clusterInfoBox.innerHTML = `
          <h4 style="font-family: var(--font-heading); color: var(--accent); margin-bottom: 8px;">${info.title}</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">${info.desc}</p>
        `;
      }
    });
  });

  function drawClusteringGraph(activeCluster) {
    if (!clusterSvg) return;
    clusterSvg.innerHTML = '';

    // Draw background graph axes
    const gridLines = `
      <line x1="40" y1="20" x2="40" y2="280" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
      <line x1="40" y1="280" x2="380" y2="280" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
      <text x="210" y="295" fill="rgba(255,255,255,0.4)" font-size="10" text-anchor="middle" font-family="monospace">Tenure Index</text>
      <text x="15" y="150" fill="rgba(255,255,255,0.4)" font-size="10" text-anchor="middle" transform="rotate(-90 15 150)" font-family="monospace">Engagement Score</text>
    `;
    clusterSvg.innerHTML = gridLines;

    employeeNodes.forEach(node => {
      const isDimmed = activeCluster !== 'all' && node.cluster.toString() !== activeCluster;
      let color = '#2cbd73'; // Cluster 1
      if (node.cluster === 2) color = '#a855f7'; // Cluster 2
      if (node.cluster === 3) color = '#0ea5e9'; // Cluster 3

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x + 20); // adjust padding
      circle.setAttribute('cy', node.y);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', color);
      circle.setAttribute('opacity', isDimmed ? '0.2' : '1');
      circle.setAttribute('style', 'cursor: pointer; transition: all 0.3s;');
      
      // Node Hover
      circle.addEventListener('mouseover', () => {
        circle.setAttribute('r', '12');
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', '2');
      });

      circle.addEventListener('mouseout', () => {
        circle.setAttribute('r', '8');
        circle.removeAttribute('stroke');
      });

      // Node Click
      circle.addEventListener('click', () => {
        clusterInfoBox.innerHTML = `
          <h4 style="font-family: var(--font-heading); color: ${color}; margin-bottom: 8px;">Node Profile: ${node.name}</h4>
          <p style="color: var(--text-main); font-size: 0.85rem; font-family: var(--font-mono);">
            Performance Index: ${node.perf}%<br>
            Engagement Score: ${node.eng}%<br>
            Hierarchical Assignment: Cluster ${node.cluster}
          </p>
        `;
      });

      clusterSvg.appendChild(circle);
    });
  }


  /* ==========================================================================
     8.3 Healthcare IT ETL Pipeline Flowchart Logic
     ========================================================================== */
  const flowSteps = document.querySelectorAll('.flowchart-step');
  const claimsInfoBox = document.getElementById('claims-info-box');
  const claimsNextBtn = document.getElementById('claims-next-step-btn');
  let activeStep = 1;

  const stepDetails = {
    1: {
      title: "Stage 1: Claims Ingestion",
      desc: "Parsing raw HIPAA electronic claims files (837 format) into memory. Systems confirm payload validation tags and structural compliance.",
      btnText: "Cleansing Pipeline <i class='fa-solid fa-arrow-right'></i>"
    },
    2: {
      title: "Stage 2: Informatica ETL Cleansing",
      desc: "Applying SQL rules via Informatica mapping templates. Records are filtered, deduplicated, and matched against active member rosters.",
      btnText: "Update Database <i class='fa-solid fa-arrow-right'></i>"
    },
    3: {
      title: "Stage 3: Facets Integration Complete",
      desc: "Cleaned data flows into Facets core. Processing updates claims records and issues adjudication signals.",
      btnText: "Restart Pipeline <i class='fa-solid fa-rotate-left'></i>"
    }
  };

  if (claimsNextBtn) {
    claimsNextBtn.addEventListener('click', () => {
      activeStep++;
      if (activeStep > 3) activeStep = 1;

      // Update active flowchart nodes
      flowSteps.forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        if (stepNum === activeStep) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });

      // Update Info box text
      const details = stepDetails[activeStep];
      if (details) {
        claimsInfoBox.querySelector('h4').innerHTML = details.title;
        claimsInfoBox.querySelector('p').innerHTML = details.desc;
        claimsNextBtn.innerHTML = details.btnText;
      }
    });
  }


  /* ==========================================================================
     9. Contact Form Validation & Clipboard Action
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all inputs.', 'error');
        return;
      }

      // Send real email via FormSubmit AJAX service
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching Message...';

      fetch("https://formsubmit.co/ajax/Vinaywizard7172@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        
        if (data.success === "true" || data.success) {
          showStatus('🎉 Your message was sent successfully! I will get back to you shortly.', 'success');
          contactForm.reset();
        } else {
          showStatus('⚠️ Submission failed. Please try copying my email directly.', 'error');
        }
      })
      .catch(error => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        showStatus('⚠️ AJAX blocked. Redirecting to standard form submission...', 'error');
        setTimeout(() => {
          contactForm.submit();
        }, 1500);
      });
    });
  }

  function showStatus(msg, type) {
    formStatus.className = `form-status ${type}`;
    formStatus.innerHTML = msg;
    
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  }

  // Copy-to-clipboard Action
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = "Vinaywizard7172@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.textContent = 'Copied!';
        copyEmailBtn.style.background = 'var(--accent)';
        copyEmailBtn.style.color = 'var(--bg-base)';
        
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copy Email';
          copyEmailBtn.style.background = 'none';
          copyEmailBtn.style.color = 'var(--accent)';
        }, 2000);
      }).catch(err => {
        console.error('Could not copy email: ', err);
      });
    });
  }

});
