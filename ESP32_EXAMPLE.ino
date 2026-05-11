/*
 * Retro Manga Console - ESP32 Example
 * 
 * Complete Arduino sketch for ESP32-based manga reader
 * Supports TFT_eSPI displays (320x240)
 * 
 * Hardware Requirements:
 * - ESP32 or ESP32-S3
 * - TFT display (320x240) with TFT_eSPI library
 * - Joystick or buttons for navigation
 * 
 * Libraries Required:
 * - TFT_eSPI
 * - ArduinoJson
 * - JPEGDecoder
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <TFT_eSPI.h>
#include <JPEGDecoder.h>
#include <ArduinoJson.h>

// ===== CONFIGURATION =====
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
const char* API_BASE = "https://your-api.vercel.app";
const char* API_TOKEN = ""; // Optional: Set if API requires authentication

// Display settings
#define SCREEN_WIDTH 320
#define SCREEN_HEIGHT 240

// Button pins (adjust for your hardware)
#define BTN_UP 32
#define BTN_DOWN 33
#define BTN_LEFT 25
#define BTN_RIGHT 26
#define BTN_SELECT 27
#define BTN_BACK 14

// ===== GLOBAL OBJECTS =====
TFT_eSPI tft = TFT_eSPI();
HTTPClient http;

// ===== STATE MANAGEMENT =====
enum AppState {
  STATE_SEARCH,
  STATE_CHAPTERS,
  STATE_READING,
  STATE_BOOKMARKS
};

AppState currentState = STATE_SEARCH;
String currentManga = "";
String currentChapter = "";
String currentSource = "comick";
int currentPage = 1;
int totalPages = 0;

// ===== SETUP =====
void setup() {
  Serial.begin(115200);
  
  // Initialize display
  tft.begin();
  tft.setRotation(1);
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  
  // Initialize buttons
  pinMode(BTN_UP, INPUT_PULLUP);
  pinMode(BTN_DOWN, INPUT_PULLUP);
  pinMode(BTN_LEFT, INPUT_PULLUP);
  pinMode(BTN_RIGHT, INPUT_PULLUP);
  pinMode(BTN_SELECT, INPUT_PULLUP);
  pinMode(BTN_BACK, INPUT_PULLUP);
  
  // Connect to WiFi
  connectWiFi();
  
  // Show main menu
  showMainMenu();
}

// ===== MAIN LOOP =====
void loop() {
  handleButtons();
  delay(100);
}

// ===== WIFI CONNECTION =====
void connectWiFi() {
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(10, 100);
  tft.setTextSize(2);
  tft.println("Connecting WiFi...");
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    tft.fillScreen(TFT_BLACK);
    tft.setCursor(10, 100);
    tft.setTextColor(TFT_GREEN);
    tft.println("Connected!");
    delay(1000);
  } else {
    tft.fillScreen(TFT_BLACK);
    tft.setCursor(10, 100);
    tft.setTextColor(TFT_RED);
    tft.println("WiFi Failed!");
    while(1) delay(1000);
  }
}

// ===== BUTTON HANDLING =====
void handleButtons() {
  if (digitalRead(BTN_UP) == LOW) {
    handleUpButton();
    delay(200);
  }
  if (digitalRead(BTN_DOWN) == LOW) {
    handleDownButton();
    delay(200);
  }
  if (digitalRead(BTN_LEFT) == LOW) {
    handleLeftButton();
    delay(200);
  }
  if (digitalRead(BTN_RIGHT) == LOW) {
    handleRightButton();
    delay(200);
  }
  if (digitalRead(BTN_SELECT) == LOW) {
    handleSelectButton();
    delay(200);
  }
  if (digitalRead(BTN_BACK) == LOW) {
    handleBackButton();
    delay(200);
  }
}

void handleUpButton() {
  // Navigate up in lists
}

void handleDownButton() {
  // Navigate down in lists
}

void handleLeftButton() {
  if (currentState == STATE_READING && currentPage > 1) {
    currentPage--;
    loadMangaPage();
  }
}

void handleRightButton() {
  if (currentState == STATE_READING && currentPage < totalPages) {
    currentPage++;
    loadMangaPage();
  }
}

void handleSelectButton() {
  // Select current item
}

void handleBackButton() {
  // Go back to previous state
  if (currentState == STATE_READING) {
    currentState = STATE_CHAPTERS;
    // Show chapters list
  } else if (currentState == STATE_CHAPTERS) {
    currentState = STATE_SEARCH;
    showMainMenu();
  }
}

// ===== UI FUNCTIONS =====
void showMainMenu() {
  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(2);
  tft.setTextColor(TFT_CYAN);
  tft.setCursor(60, 20);
  tft.println("RETRO MANGA");
  
  tft.setTextSize(1);
  tft.setTextColor(TFT_WHITE);
  tft.setCursor(20, 80);
  tft.println("1. Search Manga");
  tft.setCursor(20, 100);
  tft.println("2. Bookmarks");
  tft.setCursor(20, 120);
  tft.println("3. Trending");
}

// ===== API FUNCTIONS =====
String makeApiRequest(String endpoint) {
  String url = String(API_BASE) + endpoint;
  
  http.begin(url);
  
  // Add authentication if configured
  if (strlen(API_TOKEN) > 0) {
    http.addHeader("Authorization", String("Bearer ") + API_TOKEN);
  }
  
  int httpCode = http.GET();
  String payload = "";
  
  if (httpCode == 200) {
    payload = http.getString();
  } else {
    Serial.printf("HTTP Error: %d\n", httpCode);
  }
  
  http.end();
  return payload;
}

void searchManga(String query) {
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(10, 10);
  tft.println("Searching...");
  
  String endpoint = "/api/search?q=" + urlEncode(query) + "&source=" + currentSource;
  String response = makeApiRequest(endpoint);
  
  // Parse JSON response
  DynamicJsonDocument doc(8192);
  deserializeJson(doc, response);
  
  // Display results
  displaySearchResults(doc);
}

void loadChapters(String mangaUrl) {
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(10, 10);
  tft.println("Loading chapters...");
  
  String endpoint = "/api/chapters?url=" + urlEncode(mangaUrl) + "&source=" + currentSource;
  String response = makeApiRequest(endpoint);
  
  // Parse and display chapters
  DynamicJsonDocument doc(16384);
  deserializeJson(doc, response);
  
  displayChapterList(doc);
}

void loadMangaPage() {
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(10, 110);
  tft.setTextColor(TFT_YELLOW);
  tft.printf("Loading page %d...", currentPage);
  
  String endpoint = "/api/page?chapter=" + urlEncode(currentChapter) + 
                    "&page=" + String(currentPage) + 
                    "&source=" + currentSource;
  
  String url = String(API_BASE) + endpoint;
  http.begin(url);
  
  int httpCode = http.GET();
  
  if (httpCode == 200) {
    // Get total pages from header
    String totalPagesHeader = http.header("X-Total-Pages");
    if (totalPagesHeader.length() > 0) {
      totalPages = totalPagesHeader.toInt();
    }
    
    // Get image stream
    WiFiClient* stream = http.getStreamPtr();
    
    // Decode JPEG
    if (JpegDec.decodeStream(*stream)) {
      renderJPEG(0, 0);
      
      // Show page indicator
      tft.setTextSize(1);
      tft.setTextColor(TFT_WHITE, TFT_BLACK);
      tft.setCursor(5, 5);
      tft.printf("%d/%d", currentPage, totalPages);
    }
  } else {
    tft.fillScreen(TFT_BLACK);
    tft.setCursor(10, 110);
    tft.setTextColor(TFT_RED);
    tft.println("Failed to load page");
  }
  
  http.end();
}

void saveBookmark() {
  HTTPClient httpPost;
  String url = String(API_BASE) + "/api/bookmark/save";
  
  httpPost.begin(url);
  httpPost.addHeader("Content-Type", "application/json");
  
  // Create JSON payload
  DynamicJsonDocument doc(512);
  doc["manga"] = currentManga;
  doc["chapter"] = currentChapter;
  doc["page"] = currentPage;
  doc["source"] = currentSource;
  
  String payload;
  serializeJson(doc, payload);
  
  int httpCode = httpPost.POST(payload);
  
  if (httpCode == 201) {
    // Show success message
    tft.setCursor(10, 220);
    tft.setTextColor(TFT_GREEN);
    tft.println("Bookmark saved!");
    delay(1000);
  }
  
  httpPost.end();
}

// ===== DISPLAY FUNCTIONS =====
void displaySearchResults(DynamicJsonDocument& doc) {
  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(1);
  
  int y = 10;
  for (JsonObject result : doc.as<JsonArray>()) {
    String title = result["title"];
    tft.setCursor(10, y);
    tft.println(title);
    y += 20;
    
    if (y > 220) break;
  }
}

void displayChapterList(DynamicJsonDocument& doc) {
  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(1);
  
  int y = 10;
  for (JsonObject chapter : doc.as<JsonArray>()) {
    String title = chapter["title"];
    tft.setCursor(10, y);
    tft.println(title);
    y += 15;
    
    if (y > 220) break;
  }
}

void renderJPEG(int xpos, int ypos) {
  uint16_t* pImg;
  uint16_t mcu_w = JpegDec.MCUWidth;
  uint16_t mcu_h = JpegDec.MCUHeight;
  uint32_t max_x = JpegDec.width;
  uint32_t max_y = JpegDec.height;

  while (JpegDec.read()) {
    pImg = JpegDec.pImage;
    int mcu_x = JpegDec.MCUx * mcu_w + xpos;
    int mcu_y = JpegDec.MCUy * mcu_h + ypos;

    uint32_t win_w = (mcu_x + mcu_w <= max_x) ? mcu_w : (max_x % mcu_w);
    uint32_t win_h = (mcu_y + mcu_h <= max_y) ? mcu_h : (max_y % mcu_h);

    if (win_w && win_h) {
      tft.pushImage(mcu_x, mcu_y, win_w, win_h, pImg);
    }
  }
}

// ===== UTILITY FUNCTIONS =====
String urlEncode(String str) {
  String encoded = "";
  char c;
  for (int i = 0; i < str.length(); i++) {
    c = str.charAt(i);
    if (isalnum(c)) {
      encoded += c;
    } else {
      encoded += '%';
      encoded += String(c, HEX);
    }
  }
  return encoded;
}
