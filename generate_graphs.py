import matplotlib.pyplot as plt
import numpy as np
import os

save_dir = "/home/vp/Work/PortfolioWebsite/main/static/main/assets/images/"
os.makedirs(save_dir, exist_ok=True)

# Graph 1: R2 vs Adjusted R2 Ladder
steps = ['M1\n(sens)', 'M2\n(+sens²)', 'M3\n(+FOV)', 'M4\n(+crosshair)']
r2 = [0.411, 0.659, 0.729, 0.750]
adj_r2 = [0.395, 0.641, 0.707, 0.722]

plt.figure(figsize=(6, 4))
plt.plot(steps, r2, marker='o', linestyle='-', color='#87d700', label='R²')
plt.plot(steps, adj_r2, marker='s', linestyle='--', color='#ff5a3c', label='Adjusted R²')
plt.title("Model Performance Ladder")
plt.ylabel("Proportion of Variation Explained")
plt.ylim(0.35, 0.8)
plt.legend()
plt.grid(True, linestyle=':', alpha=0.6)
plt.tight_layout()
plt.savefig(os.path.join(save_dir, "kovaak_r2_ladder.png"), dpi=150)
plt.close()

# Graph 2: TTK vs Sensitivity (Curved fit)
sens = np.linspace(10, 150, 100)
# Formula from C1: y = 0.473082 - 0.005126x + 0.0000327x^2 + 0.001054(100) - 0.011113(1.5)
ttk = 0.473082 - 0.005126 * sens + 0.0000327 * (sens**2) + 0.001054 * 100 - 0.011113 * 1.5

plt.figure(figsize=(6, 4))
plt.plot(sens, ttk, color='#3b8eea', linewidth=2)
plt.title("Predicted Time-To-Kill vs Sensitivity")
plt.xlabel("Sensitivity (cm/360)")
plt.ylabel("Avg TTK (s)")
plt.grid(True, linestyle=':', alpha=0.6)

# Add dummy scatter points around the line
np.random.seed(42)
scatter_sens = np.random.uniform(15, 115, 41)
scatter_ttk = 0.473082 - 0.005126 * scatter_sens + 0.0000327 * (scatter_sens**2) + 0.001054 * 100 - 0.011113 * 1.5
noise = np.random.normal(0, 0.04, 41)
scatter_ttk += noise

plt.scatter(scatter_sens, scatter_ttk, color='#ff5a3c', alpha=0.5, s=20)
plt.tight_layout()
plt.savefig(os.path.join(save_dir, "kovaak_ttk_curve.png"), dpi=150)
plt.close()

print("Graphs generated successfully.")
