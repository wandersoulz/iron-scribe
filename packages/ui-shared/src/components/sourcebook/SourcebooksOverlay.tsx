import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SideOverlay } from "../common/SideOverlay";
import { Sourcebook } from "@iron-scribe/model";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedSourcebooks: Sourcebook<any>[];
  allSourcebooks: Sourcebook<any>[];
}

export const SourcebooksOverlay: React.FC<Props> = ({
  isOpen,
  onClose,
  allSourcebooks,
  selectedSourcebooks,
}) => {
  return (
    <SideOverlay
      isOpen={isOpen}
      onClose={onClose}
      title="SOURCEBOOKS"
      maxWidth={500}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionDescription}>
          MANAGE THE CONTENT PACKS ACTIVE IN YOUR ARCHIVE. ACTIVE SOURCEBOOKS
          PROVIDE ANCESTRIES, CLASSES, AND PERKS FOR YOUR HEROES.
        </Text>

        <View style={styles.bookList}>
          {selectedSourcebooks.map((book) => (
            <View
              key={book.id}
              style={[styles.bookCard, styles.bookCardActive]}
            >
              <View style={styles.bookHeader}>
                <View style={styles.bookIconContainer}>
                  <Text style={styles.bookIcon}>📖</Text>
                </View>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>
                    {book.title.toUpperCase()}
                  </Text>
                  <View style={[styles.statusBadge, styles.statusBadgeActive]}>
                    <Text style={[styles.statusText, styles.statusTextActive]}>
                      ACTIVE
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          {allSourcebooks
            .filter(
              (book) =>
                selectedSourcebooks.find((slBook) => slBook.id == book.id) ==
                null,
            )
            .map((book) => (
              <View key={book.id} style={[styles.bookCard]}>
                <View style={styles.bookHeader}>
                  <View style={styles.bookIconContainer}>
                    <Text style={styles.bookIcon}>📖</Text>
                  </View>
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>
                      {book.title.toUpperCase()}
                    </Text>
                    <View
                      style={[styles.statusBadge, styles.statusBadgeInactive]}
                    >
                      <Text style={[styles.statusText]}>AVAILABLE</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.activateButton}>
                  <Text style={styles.activateButtonText}>
                    ENABLE SOURCEBOOK
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </SideOverlay>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 32,
    gap: 32,
  },
  sectionDescription: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 2,
    lineHeight: 20,
    marginBottom: 8,
  },
  bookList: {
    gap: 20,
  },
  bookCard: {
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  bookCardActive: {
    borderColor: "rgba(99, 102, 241, 0.3)",
    backgroundColor: "rgba(30, 41, 59, 0.6)",
  },
  bookHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  bookIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  bookIcon: {
    fontSize: 24,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusBadgeActive: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  statusBadgeInactive: {
    backgroundColor: "rgba(148, 163, 184, 0.1)",
    borderColor: "rgba(148, 163, 184, 0.2)",
  },
  statusText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#64748b",
    letterSpacing: 1,
  },
  statusTextActive: {
    color: "#22c55e",
  },
  bookDescription: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 20,
  },
  activateButton: {
    marginTop: 20,
    backgroundColor: "#312e81",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activateButtonText: {
    color: "#c7d2fe",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
});
