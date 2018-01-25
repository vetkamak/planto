//
//  OutputVolume.m
//  Planto
//
//  Created by Elizabeth Makarova on 25.01.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "OutputVolume.h"
#import "React/RCTLog.h"
#import <AVFoundation/AVAudioSession.h>

@implementation OutputVolume

// This RCT (React) "macro" exposes the current module to JavaScript
RCT_EXPORT_MODULE();

// We must explicitly expose methods otherwise JavaScript can't access anything
RCT_EXPORT_METHOD(get)
{
  float volume = [AVAudioSession sharedInstance].outputVolume;
  RCTLogInfo(@"The system volume level is %f", volume);
}

@end
