# Install script for directory: /home/archit/.cargo/registry/src/index.crates.io-6f17d22bba15001f/mbedtls-sys-auto-2.28.7/vendor

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/home/archit/Desktop/final_hackathon_project/Futures_on_Chain/rofl-oracle/target/x86_64-fortanix-unknown-sgx/release/build/mbedtls-sys-auto-5eb9fdb450c1e574/out")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "TRUE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/archit/Desktop/final_hackathon_project/Futures_on_Chain/rofl-oracle/target/x86_64-fortanix-unknown-sgx/release/build/mbedtls-sys-auto-5eb9fdb450c1e574/out/build/include/cmake_install.cmake")
  include("/home/archit/Desktop/final_hackathon_project/Futures_on_Chain/rofl-oracle/target/x86_64-fortanix-unknown-sgx/release/build/mbedtls-sys-auto-5eb9fdb450c1e574/out/build/3rdparty/cmake_install.cmake")
  include("/home/archit/Desktop/final_hackathon_project/Futures_on_Chain/rofl-oracle/target/x86_64-fortanix-unknown-sgx/release/build/mbedtls-sys-auto-5eb9fdb450c1e574/out/build/library/cmake_install.cmake")

endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/home/archit/Desktop/final_hackathon_project/Futures_on_Chain/rofl-oracle/target/x86_64-fortanix-unknown-sgx/release/build/mbedtls-sys-auto-5eb9fdb450c1e574/out/build/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")