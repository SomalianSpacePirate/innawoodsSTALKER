# writes to text file to speed up some processes
#------------------------------#
FAC_ARR = ["dolg", "freedom", "isg", "loner", "merc", "monolit", "voen"] #factions Arry
A_FAC_ARR = ["bandit", "cs", "dolg", "ecolog", "greh", "isg", "merc", "military", "monolith", "renegade", "svoboda",]
WEIGHT = ["light", "medium", "heavy"];
OUTFIT = str("outfit");
UNIT_ROLE = ["scout", "fighter", "jackal", "sunset", "coyote",]
B_FAC_ARR = ["army", "dolg", "freedom", "isg", "merc", "monolith"];
#------------------------------#
OUTFITS_TXT = str("defaultOutfitsList.txt");
#------------------------------#
def appendArrayToFile(fileName, contentArray):
  with open(fileName , "a") as f:
    for i in contentArray:
      f.write(i + "\n");
#------------------------------#

def firstWordSwap(firstWordArray, centerTerm):
  finalArray = [];
  for i in firstWordArray:
    finalArray.append(i + "_" + centerTerm + "_" + OUTFIT);
  print(finalArray);
  return finalArray;
#nosorogOutfits = firstWordSwap(B_FAC_ARR, "nosorog");
#appendArrayToFile(OUTFITS_TXT, nosorogOutfits);
#protoArray = ["stalker", "cs_stalker", "dolg_heavy", "dolg", "ecolog", "isg", "military", "monolith", "svoboda"];
#protoExoOutfits = firstWordSwap(protoArray, "proto_exo");
#appendArrayToFile(OUTFITS_TXT, protoExoOutfits);

def allTypesOfMerc():
  merc = str("merc_");
  mercArray = [];
  for i in UNIT_ROLE:
    mercArray.append(merc + i + "_" + OUTFIT);
  print(mercArray);
  return mercArray;
#appendArrayToFile(OUTFITS_TXT, allTypesOfMerc());

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
















