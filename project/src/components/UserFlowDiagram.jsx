import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

/**
 * Component to visualize the user flow in the application based on user roles
 * This helps developers and stakeholders understand the application structure
 */
const UserFlowDiagram = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Lawn Refresh User Flow</Text>

        {/* Start Node */}
        <View style={styles.startNode}>
          <Text style={styles.nodeText}>User Accesses Platform</Text>
        </View>

        <View style={styles.connector} />

        {/* Authentication Decision */}
        <View style={styles.decisionNode}>
          <Text style={styles.nodeText}>Authenticated?</Text>
        </View>

        <View style={styles.splitContainer}>
          <View style={styles.splitBranch}>
            <Text style={styles.branchLabel}>No</Text>
            <View style={styles.branchConnector} />
            <View style={styles.processNode}>
              <Text style={styles.nodeText}>Login/Register</Text>
            </View>
          </View>

          <View style={styles.splitBranch}>
            <Text style={styles.branchLabel}>Yes</Text>
            <View style={styles.branchConnector} />
            <View style={styles.decisionNode}>
              <Text style={styles.nodeText}>User Role</Text>
            </View>
          </View>
        </View>

        {/* Role-based Flows */}
        <Text style={styles.sectionTitle}>Customer Flow</Text>
        <View style={styles.flowContainer}>
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Customer Dashboard</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Book Service</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Select Service Type</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Choose Date/Time</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>View Price Estimate</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.decisionNode}>
            <Text style={styles.nodeText}>Confirm Booking?</Text>
          </View>

          <View style={styles.splitContainer}>
            <View style={styles.splitBranch}>
              <Text style={styles.branchLabel}>Yes</Text>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Process Booking</Text>
              </View>
              <View style={styles.connector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Receive Confirmation</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <Text style={styles.branchLabel}>No</Text>
              <View style={[styles.loopConnector]} />
              <Text style={styles.loopText}>Back to Book Service</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Provider Flow</Text>
        <View style={styles.flowContainer}>
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Provider Dashboard</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>View Calendar</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Manage Bookings</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.decisionNode}>
            <Text style={styles.nodeText}>Action Type</Text>
          </View>

          <View style={styles.splitContainer}>
            <View style={styles.splitBranch}>
              <Text style={styles.branchLabel}>Update</Text>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Modify Booking</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <Text style={styles.branchLabel}>Complete</Text>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Mark Complete</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <Text style={styles.branchLabel}>Cancel</Text>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Cancel Service</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Admin Flow</Text>
        <View style={styles.flowContainer}>
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Admin Dashboard</Text>
          </View>

          <View style={styles.splitContainer}>
            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Manage Providers</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Define Service Areas</Text>
              </View>
              <View style={styles.connector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Map Integration</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Set Service Types</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>View Analytics</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Notification System</Text>
        <View style={styles.flowContainer}>
          <View style={styles.processNode}>
            <Text style={styles.nodeText}>Send Notifications</Text>
          </View>

          <View style={styles.splitContainer}>
            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Email Confirmation</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>SMS Reminder</Text>
              </View>
            </View>

            <View style={styles.splitBranch}>
              <View style={styles.branchConnector} />
              <View style={styles.processNode}>
                <Text style={styles.nodeText}>Status Updates</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2E7D32',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 16,
    color: '#2E7D32',
    alignSelf: 'flex-start',
  },
  startNode: {
    width: 200,
    padding: 12,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processNode: {
    width: 180,
    padding: 12,
    backgroundColor: '#A5D6A7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  decisionNode: {
    width: 160,
    height: 80,
    backgroundColor: '#FFC107',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '0deg' }],
    marginVertical: 16,
  },
  nodeText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
  },
  connector: {
    width: 3,
    height: 24,
    backgroundColor: '#6c757d',
  },
  splitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  splitBranch: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  branchLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6c757d',
  },
  branchConnector: {
    width: 3,
    height: 24,
    backgroundColor: '#6c757d',
  },
  loopConnector: {
    width: 3,
    height: 24,
    backgroundColor: '#6c757d',
    marginBottom: 8,
  },
  loopText: {
    fontStyle: 'italic',
    color: '#6c757d',
  },
  flowContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f4f7',
    padding: 16,
    borderRadius: 12,
  },
});

export default UserFlowDiagram;
