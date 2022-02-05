import os
os.chdir("./public/SignFiles_scraped")
# for f in os.listdir():
#     if f.endswith("(Case Conflict).sigml"):
#         n = f.replace(" (Case Conflict).sigml", ".sigml")
#         if os.path.exists(n):
#             os.remove(n)
#         os.rename(f, n)
#         print(f)

for f in os.listdir():
    os.rename(f, "../SignFiles_small/"+f.lower())
