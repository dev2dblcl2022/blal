//#import <UserNotifications/UNUserNotificationCenter.h>
//#import <React/RCTBridgeDelegate.h>
//#import <UIKit/UIKit.h>
///@import Firebase;
////@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate, FIRMessagingDelegate>
//@property (nonatomic, strong) UIWindow *window;
//
//@end

#import <UserNotifications/UNUserNotificationCenter.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
@property (nonatomic, strong) UIWindow *window;

@end
