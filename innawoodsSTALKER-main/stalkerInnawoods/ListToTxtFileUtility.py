# writes to text file to speed up some processes
#------------------------------#
FAC_ARR = ["dolg", "freedom", "isg", "loner", "merc", "monolit", "voen"] #factions Arry
A_FAC_ARR = ["bandit", "cs", "dolg", "ecolog", "greh", "isg", "merc", "military", "monolith", "renegade", "svoboda",]
WEIGHT = ["light", "medium", "heavy"];
OUTFIT = str("outfit");
#------------------------------#
def appendArrayToFile(fileName, contentArray):
  with open(fileName , "a") as f:
    for i in contentArray:
      f.write(i + "\n");
#------------------------------#
def exoskeletonOutfits():
  exo = str("_exo_");
  exoArray = [];
  for i in A_FAC_ARR:
    exoArray.append(str( i + exo + OUTFIT));
  print(exoArray);
  return exoArray;
#appendArrayToFile("defaultOutfitsList.txt", exoskeletonOutfits());

def lightOutfits():
  light = str("light_");
  outfit = str("_outfit");
  lightOutfitsArr = [];
  for i in FAC_ARR:
    lightOutfitsArr.append(str(light + i + outfit));
  #print(lightOutfitsArr);
  return lightOutfitsArr;
#appendArrayToFile("defaultOutfitsList.txt", lightOutfits());
















