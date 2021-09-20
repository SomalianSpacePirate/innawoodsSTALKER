import json;

#def tester1():
#  test1 = str("    {\"gameName\": \"ak\", \"itemName\": [\"ak_47\", \"wpn_ak47\"]}\n");
#  with open("masterItemList.json", "r") as file:
#    json_file = file.readlines();
#
#  json_file.insert(3, test1);
#  print(type(json_file));
#
#  with open("masterItemList.json", "w") as f:
#    contents = "".join(json_file);
#    print(type(contents));
#    f.write(contents);

def targetValueList(index):
  with open("itemList.txt", "r") as f:
    file = f.readlines();
  tgtLine = file[index];
  tgtLine = tgtLine.split();
  gameName = tgtLine[0];
  tgtLine.pop(0);
  itemNameList = [];
  for x in tgtLine:
    itemNameList.append(x);
  itemNameList = json.dumps(itemNameList);
  textGameName = str("    {\"gameName\": \""+gameName+"\""+", \"itemName\": "+itemNameList+"}\n");
  print(textGameName);
  return textGameName;

def targetFileName():
  fileName = input(str("insert the name of the json file without the extension: "));
  extensionType = input(str("insert the file extension type WITHOUT the period: "));
  wholeFileName = str(fileName + "." + extensionType);
  return wholeFileName;

def targetIndex():
  targetLineNumber = int(input(str("insert empty line number in target file: ")));
  targetLineNumber = targetLineNumber - 1;
  return targetLineNumber;

def addComma(index, fileData):
  endComma = '    ' + fileData[index - 1].strip() + ',\n';
  fileData[index - 1] = endComma;
  return fileData;

def writeToJsonList(index, value, fileName):
  with open(fileName, "r") as f:
    file = f.readlines(); 
  file = addComma(index, file);
  file.insert(index, value);
  with open(fileName, "w") as f:
    file = "".join(file);
    f.write(file);

def lenItemList():
  with open("itemList.txt", "r") as f:
    file = f.readlines();
  count = len(file);
  return count;

def main():
  print("warning: all inputs are case sensitive!!!\n");
  #fileName = targetFileName();
  fileName = "masterItemList.json";
  index = targetIndex();
  for i in range(lenItemList()):
    writeToJsonList(index, targetValueList(i), fileName);
    index = index + 1;

def test():
  with open("itemList.txt", "r") as f:
    file = f.readlines();
  print(len(file));

#test();
main();

# EXAMPLE:
'''
{
  "items":[
    {"gameName": "example", "itemName": ["example"]}

  ]
}
'''








































































