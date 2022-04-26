////add firebase header file
//#import <Firebase.h>
//#import <UserNotifications/UserNotifications.h>
//#import <RNCPushNotificationIOS.h>
//#import "AppDelegate.h"
//#import <React/RCTLinkingManager.h>
//#import <React/RCTBridge.h>
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
//
//#ifdef FB_SONARKIT_ENABLED
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//
//
//// Start I added
//#import <RNCPushNotificationIOS.h>
//#import <UserNotifications/UNUserNotificationCenter.h>
//
//@import Firebase;
//// End I added
//
//
//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
//#endif
//
//@implementation AppDelegate
//
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//{
//
//  // Start I added
//    [FIRApp configure];
//
//    if ([UNUserNotificationCenter class] != nil) {
//      // iOS 10 or later
//      // For iOS 10 display notification (sent via APNS)
//      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
//      //UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
//      UNAuthorizationOptions authOptions = UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound |  UNNotificationPresentationOptionBadge;
//      [[UNUserNotificationCenter currentNotificationCenter]
//          requestAuthorizationWithOptions:authOptions
//          completionHandler:^(BOOL granted, NSError * _Nullable error) {
//            // ...
//          }];
//    } else {
//      // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
//      UIUserNotificationType allNotificationTypes =
//      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
//      UIUserNotificationSettings *settings =
//      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
//      [application registerUserNotificationSettings:settings];
//    }
//
//    [application registerForRemoteNotifications];
//
//    [FIRMessaging messaging].delegate = self;
//
////    [[FIRInstanceID instanceID] instanceIDWithHandler:^(FIRInstanceIDResult * _Nullable result,
////                                                        NSError * _Nullable error) {
////      if (error != nil) {
////        NSLog(@"Error fetching remote instance ID: %@", error);
////      } else {
////        NSLog(@"Remote instance ID token: %@", result.token);
////      }
////    }];
//
//    [FIRMessaging messaging].autoInitEnabled = YES;
//
//  // End I added
//
//#ifdef FB_SONARKIT_ENABLED
//  InitializeFlipper(application);
//#endif
//
//  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
//                                                   moduleName:@"blal"
//                                            initialProperties:nil];
//
//  if (@available(iOS 13.0, *)) {
//      rootView.backgroundColor = [UIColor systemBackgroundColor];
//  } else {
//      rootView.backgroundColor = [UIColor whiteColor];
//  }
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
//  // Define UNUserNotificationCenter
//   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//   center.delegate = self;
//  return YES;
//}
//
//// Start I added
//
//- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
//    NSLog(@"FCM registration token: %@", fcmToken);
//    // Notify about received token.
////    NSDictionary *dataDict = [NSDictionary dictionaryWithObject:fcmToken forKey:@"token"];
////    [[NSNotificationCenter defaultCenter] postNotificationName:
////     @"FCMToken" object:nil userInfo:dataDict];
//}
//
//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//  [FIRMessaging messaging].APNSToken = deviceToken;
//  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//}
//
//- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
//{
//  [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
//}
//
//// Required for the notification event. You must call the completion handler after handling the remote notification.
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
//{
//  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
//  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//
//// Required for the registrationError event.
//- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
//{
//  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
//}
//
//// Required for the localNotification event.
//- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
//{
//  [RNCPushNotificationIOS didReceiveLocalNotification:notification];
//}
//
//// Called when a notification is delivered to a foreground app.
//-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
//  {
//    NSDictionary *userInfo = notification.request.content.userInfo;
//    [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
//    //completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
//    NSLog(@"%@", userInfo);
//    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound |  UNNotificationPresentationOptionBadge);
//  }
//
//// End I added
//
////Called when a notification is delivered to a foreground app.
////-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
////{
////  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
////}
//
//- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
//{
//#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//#else
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//#endif
//}
//
////// Required for the register event.
////- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
////{
//// [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
////}
////// Required for the notification event. You must call the completion handler after handling the remote notification.
////- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
////fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
////{
////  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
////}
////// Required for the registrationError event.
////- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
////{
//// [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
////}
//// Required for localNotification event
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//didReceiveNotificationResponse:(UNNotificationResponse *)response
//         withCompletionHandler:(void (^)(void))completionHandler
//{
//  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
//}
//
//
//- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
//            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
//{
//
//  NSString *urlString = url.absoluteString;
//  NSDictionary *userInfo =
//  [NSDictionary dictionaryWithObject:urlString forKey:@"appInvokeNotificationKey"];
//  [[NSNotificationCenter defaultCenter] postNotificationName:
//   @"appInvokeNotification" object:nil userInfo:userInfo];
//  return [RCTLinkingManager application:app openURL:url options:options];
//}
//
//@end


//add firebase header file
//#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import "AppDelegate.h"
#import <React/RCTLinkingManager.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //add firebase configure line
//  [FIRApp configure];
  
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"blal"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // Define UNUserNotificationCenter
   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
   center.delegate = self;
  
  
  NSString *mediaType = AVMediaTypeVideo;
  AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:mediaType];
  if(authStatus == AVAuthorizationStatusAuthorized) {
    // do your logic
  } else if(authStatus == AVAuthorizationStatusDenied){
    // denied
  } else if(authStatus == AVAuthorizationStatusRestricted){
    // restricted, normally won't happen
  } else if(authStatus == AVAuthorizationStatusNotDetermined){
    // not determined?!
    [AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
      if(granted){
        NSLog(@"Granted access to Camera %@", mediaType);
      } else {
        NSLog(@"Not granted access to Camera %@", mediaType);
      }
    }];
  } else {
    // impossible, unknown authorization status
  }
  
  
  return YES;
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}


- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  
  NSString *urlString = url.absoluteString;
  NSDictionary *userInfo =
  [NSDictionary dictionaryWithObject:urlString forKey:@"appInvokeNotificationKey"];
  [[NSNotificationCenter defaultCenter] postNotificationName:
   @"appInvokeNotification" object:nil userInfo:userInfo];
  return [RCTLinkingManager application:app openURL:url options:options];
}

@end
