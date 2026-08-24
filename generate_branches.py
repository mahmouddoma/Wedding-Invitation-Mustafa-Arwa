import math

def make_leaf(xb, yb, xt, yt, w=3.6):
    vx = xt - xb
    vy = yt - yb
    length = math.sqrt(vx**2 + vy**2)
    nx = -vy / length * w
    ny = vx / length * w
    
    # 2 control points for smooth almond/olive leaf shape
    mx1 = xb + vx*0.5 + nx
    my1 = yb + vy*0.5 + ny
    mx2 = xb + vx*0.5 - nx
    my2 = yb + vy*0.5 - ny
    
    return f"M {xb:.1f},{yb:.1f} Q {mx1:.1f},{my1:.1f} {xt:.1f},{yt:.1f} Q {mx2:.1f},{my2:.1f} {xb:.1f},{yb:.1f} Z"

def make_branch_svg(direction='left'):
    # ViewBox 0 0 70 26
    # If left, stem runs from (66, 13) to (5, 13)
    # If right, stem runs from (4, 13) to (65, 13)
    
    if direction == 'left':
        stem = "M 66,13 C 45,13 25,12 5,13"
        leaves = [
            # Terminal Tip Leaf
            make_leaf(6, 13, 0.5, 13, 2.4),
            # Alternating pairs along stem
            make_leaf(15, 12.8, 7.5, 4.5, 3.2),
            make_leaf(24, 13.0, 17.0, 21.5, 3.4),
            make_leaf(33, 12.8, 25.5, 3.8, 3.5),
            make_leaf(42, 13.0, 35.0, 22.2, 3.6),
            make_leaf(51, 12.8, 43.5, 4.2, 3.5),
            make_leaf(60, 13.0, 53.0, 21.8, 3.4),
        ]
        veins = [
            "M 15,12.8 L 9,6",
            "M 24,13.0 L 18.5,19.5",
            "M 33,12.8 L 27,5.5",
            "M 42,13.0 L 36.5,20",
            "M 51,12.8 L 45,6",
            "M 60,13.0 L 54.5,19.8",
        ]
    else:
        stem = "M 4,13 C 25,13 45,12 65,13"
        leaves = [
            # Terminal Tip Leaf
            make_leaf(64, 13, 69.5, 13, 2.4),
            # Alternating pairs along stem
            make_leaf(55, 12.8, 62.5, 4.5, 3.2),
            make_leaf(46, 13.0, 53.0, 21.5, 3.4),
            make_leaf(37, 12.8, 44.5, 3.8, 3.5),
            make_leaf(28, 13.0, 35.0, 22.2, 3.6),
            make_leaf(19, 12.8, 26.5, 4.2, 3.5),
            make_leaf(10, 13.0, 17.0, 21.8, 3.4),
        ]
        veins = [
            "M 55,12.8 L 61,6",
            "M 46,13.0 L 51.5,19.5",
            "M 37,12.8 L 43,5.5",
            "M 28,13.0 L 33.5,20",
            "M 19,12.8 L 25,6",
            "M 10,13.0 L 15.5,19.8",
        ]
        
    leaf_paths = "\n      ".join([f'<path d="{d}" fill="url(#goldGradBranch)" />' for d in leaves])
    vein_paths = "\n      ".join([f'<path d="{d}" stroke="#b57e28" stroke-width="0.75" stroke-linecap="round" opacity="0.7" />' for d in veins])
    
    return f"""<svg class="gold-botanical-branch branch-{direction}" viewBox="0 0 70 26" width="48" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradBranch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0d18a" />
      <stop offset="40%" stop-color="#dfaf56" />
      <stop offset="100%" stop-color="#b8832a" />
    </linearGradient>
  </defs>
  <!-- Main Stem -->
  <path d="{stem}" stroke="url(#goldGradBranch)" stroke-width="1.4" stroke-linecap="round" />
  <!-- Leaves -->
  <g>
    {leaf_paths}
  </g>
  <!-- Leaf Veins -->
  <g>
    {vein_paths}
  </g>
</svg>"""

with open(r'c:\Users\win10\Music\mostafa-invitation\public\images\branch_left.svg', 'w', encoding='utf-8') as f:
    f.write(make_branch_svg('left'))

with open(r'c:\Users\win10\Music\mostafa-invitation\public\images\branch_right.svg', 'w', encoding='utf-8') as f:
    f.write(make_branch_svg('right'))

print('Generated authentic botanical SVG branches!')
